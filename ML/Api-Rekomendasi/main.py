from fastapi import FastAPI, Query
from pydantic import BaseModel
import pandas as pd
import joblib
import warnings
import numpy as np

# Suppress sklearn version warnings
warnings.filterwarnings("ignore", category=UserWarning, module="sklearn")

# Load model dan data with error handling
try:
    tf = joblib.load("tfidf_vectorizer.pkl")
    cosine_sim_df = joblib.load("cosine_similarity_df.pkl")
except Exception as e:
    print(f"Warning: Error loading models - {e}")
    tf = None
    cosine_sim_df = None

# Try different encodings for the CSV file to handle encoding issues
try:
    destination = pd.read_csv("tourism_jakarta_with_images.csv", encoding='utf-8')
except UnicodeDecodeError:
    try:
        destination = pd.read_csv("tourism_jakarta_with_images.csv", encoding='latin-1')
    except UnicodeDecodeError:
        destination = pd.read_csv("tourism_jakarta_with_images.csv", encoding='cp1252')

# Inisialisasi FastAPI
app = FastAPI()

# Data model untuk request
class PlaceRequest(BaseModel):
    place_name: str
    k: int = 10

# Fungsi rekomendasi
def destination_recommendations(place_name, similarity_data=cosine_sim_df, items=destination[['Place_Name','Description', 'Category', 'Lat', 'Long', 'Image_URL']], k=10):
    if similarity_data is None:
        raise Exception("Similarity data not loaded properly")
    if place_name not in similarity_data.columns:
        return []
    index = similarity_data.loc[:, place_name].to_numpy().argpartition(range(-1, -k, -1))
    closest = similarity_data.columns[index[-1:-(k+2):-1]]
    closest = closest.drop(place_name, errors='ignore')
    return pd.DataFrame(closest).merge(items).head(k)


def find_closest_place(name, list_places):
    name = name.lower().strip()
    matches = [p for p in list_places if p.lower().strip() == name]
    return matches[0] if matches else None


@app.post("/recommend")
def recommend_places(req: PlaceRequest):
    try:
        if cosine_sim_df is None:
            return {"error": "Models not loaded properly. Please check the model files."}
        
        matched_place = find_closest_place(req.place_name, cosine_sim_df.columns)

        if not matched_place:
            return {"error": f"Place '{req.place_name}' not found in the dataset"}

        recommendations = destination_recommendations(matched_place, k=req.k)

        return recommendations.to_dict(orient="records")
    except Exception as e:
        return {"error": str(e)}


@app.get("/recommend/category")
def get_recommendation_by_category(category: str = Query(...), limit: int = Query(6)):
    filtered = destination[destination["Category"].str.lower() == category.lower()]
    if filtered.empty:
        return {"error": f"Tidak ada tempat wisata dengan kategori '{category}'"}
    sampled = filtered.sample(n=min(limit, len(filtered)))
    return sampled.fillna("").to_dict(orient="records")

@app.get("/recommend/most_popular")
def get_most_popular_places(limit: int = Query(6)):
    if "Rating" not in destination.columns:
        return {"error": "Kolom 'Rating' tidak ditemukan di dataset"}
    popular = destination.sort_values(by="Rating", ascending=False)
    sampled = popular.head(limit)
    return sampled.fillna("").to_dict(orient="records")

# Add a health check endpoint
@app.get("/")
def health_check():
    status = {
        "status": "running",
        "models_loaded": cosine_sim_df is not None and tf is not None,
        "data_loaded": destination is not None if 'destination' in globals() else False
    }
    return status

def haversine(lat1, lon1, lat2, lon2):
    # Konversi derajat ke radian
    lat1, lon1, lat2, lon2 = map(np.radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = np.sin(dlat/2.0)**2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon/2.0)**2
    c = 2 * np.arcsin(np.sqrt(a))
    km = 6371 * c  # Radius bumi dalam kilometer
    return km

@app.get("/recommend/nearby")
def get_nearby_places(lat: float = Query(...), long: float = Query(...), limit: int = Query(6)):
    try:
        # Pastikan kolom Lat dan Long ada
        if "Lat" not in destination.columns or "Long" not in destination.columns:
            return {"error": "Kolom 'Lat' atau 'Long' tidak ditemukan di dataset"}
        # Hitung jarak
        destination["distance_km"] = haversine(lat, long, destination["Lat"], destination["Long"])
        nearby = destination.sort_values(by="distance_km").head(limit)
        return nearby.fillna("").to_dict(orient="records")
    except Exception as e:
        return {"error": str(e)}
