import joblib
from .schemas import PlaceResponse
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
import tensorflow as tf

from math import radians, cos, sin, asin, sqrt

def haversine(lon1, lat1, lon2, lat2):
    # convert decimal degrees to radians
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    # haversine formula
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a))
    r = 6371  # Radius of earth in kilometers
    return c * r

class RecommendationService:
    def __init__(self, place_indices_path, cosine_sim_path):
        self.place_indices = joblib.load(place_indices_path)
        self.cosine_sim = joblib.load(cosine_sim_path)

    def recommend_by_place(self, place_id: int, places_df, top_n=5):
        if place_id not in self.place_indices:
            return None
        idx = self.place_indices[place_id]
        sim_scores = list(enumerate(self.cosine_sim[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        top_indices = [i[0] for i in sim_scores[1:top_n+1]]
        results = places_df.iloc[top_indices]
        return [PlaceResponse(**row) for row in results.to_dict(orient="records")]

    def recommend_nearby_places(self, user_lat, user_lon, places_df, top_n=5):
        # Hitung jarak ke semua tempat
        places_df = places_df.copy()
        places_df['distance_km'] = places_df.apply(
            lambda row: haversine(user_lon, user_lat, row['longitude'], row['latitude']), axis=1
        )
        places_df = places_df.sort_values('distance_km').head(top_n)
        return [PlaceResponse(**row) for row in places_df.to_dict(orient="records")]

    def recommend_by_categories(self, categories, places_df, top_n=5):
        # Filter tempat berdasarkan satu atau lebih kategori
        filtered = places_df[places_df['category'].isin(categories)]
        # Urutkan by nama (atau id), ambil top_n
        filtered = filtered.sort_values('name').head(top_n)
        return [PlaceResponse(**row) for row in filtered.to_dict(orient="records")]

class CollaborativeFilteringTFService:
    def __init__(self, tf_model_path):
        # Load TensorFlow model
        self.model = tf.keras.models.load_model(tf_model_path)
        self.user_encoder = None
        self.place_encoder = None

    def fit_encoders(self, ratings_df: pd.DataFrame, places_df: pd.DataFrame):
        # Fit encoder setiap kali API start atau data berubah
        self.user_encoder = LabelEncoder()
        self.place_encoder = LabelEncoder()
        self.user_encoder.fit(ratings_df['userId'].unique())
        self.place_encoder.fit(places_df['id'].unique())

    def predict_rating(self, user_id, place_id, ratings_df):
        # Fallback ke mean rating jika user_id atau place_id tidak ditemukan
        try:
            user_idx = self.user_encoder.transform([user_id])[0]
            place_idx = self.place_encoder.transform([place_id])[0]
        except Exception:
            return ratings_df['value'].mean()
        pred = self.model.predict([np.array([user_idx]), np.array([place_idx])], verbose=0)
        return float(pred[0][0])

    def recommend_by_user(self, user_id: int, ratings_df: pd.DataFrame, places_df: pd.DataFrame, top_n=5):
        # Fit encoder jika belum
        if self.user_encoder is None or self.place_encoder is None:
            self.fit_encoders(ratings_df, places_df)
        # Tempat yang belum dirating user
        rated_places = ratings_df[ratings_df['userId'] == user_id]['placeId'].tolist()
        unrated_places = places_df[~places_df['id'].isin(rated_places)]['id'].tolist()
        predictions = []
        for place_id in unrated_places:
            est_rating = self.predict_rating(user_id, place_id, ratings_df)
            predictions.append((place_id, est_rating))
        predictions = sorted(predictions, key=lambda x: x[1], reverse=True)[:top_n]
        top_place_ids = [pid for pid, _ in predictions]
        results = places_df[places_df['id'].isin(top_place_ids)]
        return [PlaceResponse(**row) for row in results.to_dict(orient="records")]

class HybridRecommendationTFService:
    def __init__(self, collab_service: CollaborativeFilteringTFService, model_umur_path, user_ages_path, weight_collab=0.7, weight_umur=0.3):
        self.collab_service = collab_service
        self.model_umur = joblib.load(model_umur_path)
        self.user_ages = joblib.load(user_ages_path) # Series: user_id -> age
        self.weight_collab = weight_collab
        self.weight_umur = weight_umur

    def hybrid_score(self, user_id, place_id, ratings_df):
        # Collaborative prediction (TensorFlow)
        try:
            collab_pred = self.collab_service.predict_rating(user_id, place_id, ratings_df)
        except Exception:
            collab_pred = np.mean(ratings_df['value'])
        # Umur prediction
        try:
            umur_pengguna = self.user_ages.loc[user_id]
            umur_pred = self.model_umur.predict([[umur_pengguna]])[0][place_id]
        except Exception:
            umur_pred = np.mean(ratings_df['value'])
        # Combine
        return self.weight_collab * collab_pred + self.weight_umur * umur_pred

    def recommend_hybrid(self, user_id: int, ratings_df: pd.DataFrame, places_df: pd.DataFrame, top_n=5):
        # Pastikan encoder sudah fit
        if self.collab_service.user_encoder is None or self.collab_service.place_encoder is None:
            self.collab_service.fit_encoders(ratings_df, places_df)
        place_ids = places_df['id'].unique()
        rated_places = ratings_df[ratings_df['userId'] == user_id]['placeId'].unique()
        unrated_places = [place_id for place_id in place_ids if place_id not in rated_places]
        predictions = []
        for place_id in unrated_places:
            score = self.hybrid_score(user_id, place_id, ratings_df)
            predictions.append((place_id, score))
        top_predictions = sorted(predictions, key=lambda x: x[1], reverse=True)[:top_n]
        top_place_ids = [place_id for place_id, _ in top_predictions]
        results = places_df[places_df['id'].isin(top_place_ids)]
        return [PlaceResponse(**row) for row in results.to_dict(orient="records")] 