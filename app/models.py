from sqlalchemy import Column, Integer, String, Float, ForeignKey, Text, ARRAY
from .database import Base

class Place(Base):
    __tablename__ = "Place"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    category = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    price = Column(Float)
    image_url = Column(String)

class User(Base):
    __tablename__ = "User"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)
    password = Column(String)
    preferences = Column(ARRAY(Text))
    age = Column(Integer)

class Rating(Base):
    __tablename__ = "Rating"
    id = Column(Integer, primary_key=True, index=True)
    value = Column(Integer)
    userId = Column(Integer, ForeignKey('User.id'))
    placeId = Column(Integer, ForeignKey('Place.id')) 