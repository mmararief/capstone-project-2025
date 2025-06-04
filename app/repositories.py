from sqlalchemy.orm import Session
from .models import Place
import pandas as pd
from sqlalchemy import text

class PlaceRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all_places(self):
        return self.db.query(Place).all()

    def get_places_df(self):
        places = self.get_all_places()
        df = pd.DataFrame([
            {
                "id": p.id,
                "name": p.name,
                "description": p.description,
                "category": p.category,
                "latitude": p.latitude,
                "longitude": p.longitude,
                "price": p.price if p.price is not None else 0,
                "image_url": p.image_url or ""
            }
            for p in places
        ])
        return df

from .models import Rating

class RatingRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_ratings_df(self):
        # Query manual karena model Rating belum ada, asumsikan tabel Rating (huruf besar)
        result = self.db.execute(text('SELECT id, value, "userId", "placeId" FROM "Rating"'))
        rows = result.fetchall()
        df = pd.DataFrame(rows, columns=["id", "value", "userId", "placeId"])
        return df 