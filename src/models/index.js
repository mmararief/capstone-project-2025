const { sequelize } = require('../config/database');
const User = require('./user.model');
const Place = require('./place.model');

// Define associations here if needed
// Example: User.hasMany(Place);

module.exports = {
  sequelize,
  User,
  Place
}; 