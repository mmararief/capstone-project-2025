from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import text
from .database import SessionLocal
from .repositories import PlaceRepository, RatingRepository
from .services import RecommendationService, CollaborativeFilteringTFService, HybridRecommendationTFService
from .schemas import PlaceResponse

router = APIRouter()

# Inisialisasi service (bisa diimprove pakai dependency injection lebih lanjut)
rec_service = RecommendationService(
    place_indices_path="models_ml/place_indices.joblib",
    cosine_sim_path="models_ml/cosine_similarity_matrix.joblib"
)
collab_service = CollaborativeFilteringTFService(
    tf_model_path="models_ml/tf_collaborative_filtering_model.h5"
)
hybrid_service = HybridRecommendationTFService(
    collab_service=collab_service,
    model_umur_path="models_ml/model_umur_linear_regression.joblib",
    user_ages_path="models_ml/user_ages_series.joblib",
    weight_collab=0.7,
    weight_umur=0.3
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/db-check")
def db_check():
    try:
        db = SessionLocal()
        db.execute(text("SELECT 1"))
        db.close()
        return {"status": "success", "message": "Database connection OK"}
    except SQLAlchemyError as e:
        return {"status": "error", "message": str(e)}

@router.get("/recommend/place/{place_id}", response_model=list[PlaceResponse])
def recommend_place_by_place_api(place_id: int, top_n: int = 5, db: Session = Depends(get_db)):
    repo = PlaceRepository(db)
    places_df = repo.get_places_df()
    result = rec_service.recommend_by_place(place_id, places_df, top_n)
    if result is None:
        raise HTTPException(status_code=404, detail="Place ID not found")
    return result

@router.get("/recommend/user/{user_id}", response_model=list[PlaceResponse])
def recommend_collaborative(user_id: int, top_n: int = 5, db: Session = Depends(get_db)):
    place_repo = PlaceRepository(db)
    rating_repo = RatingRepository(db)
    places_df = place_repo.get_places_df()
    ratings_df = rating_repo.get_ratings_df()
    result = collab_service.recommend_by_user(user_id, ratings_df, places_df, top_n)
    if not result:
        raise HTTPException(status_code=404, detail="User ID not found or no recommendations")
    return result

@router.get("/recommend/hybrid/{user_id}", response_model=list[PlaceResponse])
def recommend_hybrid(user_id: int, top_n: int = 5, db: Session = Depends(get_db)):
    place_repo = PlaceRepository(db)
    rating_repo = RatingRepository(db)
    places_df = place_repo.get_places_df()
    ratings_df = rating_repo.get_ratings_df()
    result = hybrid_service.recommend_hybrid(user_id, ratings_df, places_df, top_n)
    if result is None:
        raise HTTPException(status_code=404, detail="User ID not found or no recommendations")
    return result

@router.get("/recommend/nearby", response_model=list[PlaceResponse])
def recommend_nearby(lat: float, lon: float, top_n: int = 5, db: Session = Depends(get_db)):
    repo = PlaceRepository(db)
    places_df = repo.get_places_df()
    result = rec_service.recommend_nearby_places(lat, lon, places_df, top_n)
    return result

@router.get("/recommend/category", response_model=list[PlaceResponse])
def recommend_by_category(categories: str, top_n: int = 5, db: Session = Depends(get_db)):
    repo = PlaceRepository(db)
    places_df = repo.get_places_df()
    # categories: comma-separated string, convert to list
    category_list = [c.strip() for c in categories.split(",") if c.strip()]
    result = rec_service.recommend_by_categories(category_list, places_df, top_n)
    return result 