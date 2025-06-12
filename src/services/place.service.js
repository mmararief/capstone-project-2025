const Place = require('../models/place.model');

class PlaceService {
  async getAllPlaces() {
    return await Place.findAll();
  }

  async getPlaceById(id) {
    const place = await Place.findByPk(id);
    if (!place) {
      throw new Error('Place not found');
    }
    return place;
  }

  async createPlace(placeData) {
    const place = await Place.create(placeData);
    return place;
  }

  async updatePlace(id, placeData) {
    const place = await Place.findByPk(id);
    if (!place) {
      throw new Error('Place not found');
    }

    await place.update(placeData);
    return place;
  }

  async deletePlace(id) {
    const place = await Place.findByPk(id);
    if (!place) {
      throw new Error('Place not found');
    }

    await place.destroy();
    return { message: 'Place deleted successfully' };
  }
}

module.exports = new PlaceService(); 