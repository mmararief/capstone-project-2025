const axios = require('axios');
const {
  recommendByPlace,
  recommendByCategory,
  recommendNearby,
  recommendPopular
} = require('../services/recommend.service');
const config = require('../config');

exports.recommendByPlace = async (req, res, next) => {
  try {
    const recommendations = await recommendByPlace(req.body);
    res.json(recommendations);
  } catch (err) {
    next(err);
  }
};

exports.recommendByCategory = async (req, res, next) => {
  try {
    const { category, limit = 6 } = req.query;
    const recommendations = await recommendByCategory(category, parseInt(limit));
    res.json(recommendations);
  } catch (err) {
    next(err);
  }
};

exports.recommendNearby = async (req, res, next) => {
  try {
    const { lat, long, limit = 6 } = req.query;
    const recommendations = await recommendNearby(
      parseFloat(lat),
      parseFloat(long),
      parseInt(limit)
    );
    res.json(recommendations);
  } catch (err) {
    next(err);
  }
};

exports.recommendPopular = async (req, res, next) => {
  try {
    const { limit = 6 } = req.query;
    const recommendations = await recommendPopular(parseInt(limit));
    res.json(recommendations);
  } catch (err) {
    next(err);
  }
};