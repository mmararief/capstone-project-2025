const User = require('../models/user.model');
const Place = require('../models/place.model');

class RecommendService {
  async getRecommendations(userId) {
    // Get user preferences
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Get all places
    const allPlaces = await Place.findAll();

    // Simple recommendation based on user preferences
    const recommendations = allPlaces.filter(place => {
      // Add your recommendation logic here based on user preferences
      // This is a simple example - you might want to implement more sophisticated logic
      return true;
    });

    return recommendations;
  }

  async updateUserPreferences(userId, preferences) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    await user.update({ preferences });
    return user;
  }
}

module.exports = new RecommendService();