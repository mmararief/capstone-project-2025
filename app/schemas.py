from pydantic import BaseModel

class PlaceResponse(BaseModel):
    id: int
    name: str
    category: str
    description: str
    latitude: float
    longitude: float
    price: float
    image_url: str

    class Config:
        orm_mode = True 