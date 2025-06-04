require("dotenv").config(); // hanya perlu sekali di file entry (biasanya server.js), tapi bisa ditambahkan di sini juga jika perlu
const axios = require("axios");
const { recommendByPlaceSchema } = require("../utils/validators");

const BASE_URL = process.env.RECOMMENDATION_API_URL;

exports.dbCheck = async (req, res, next) => {
  try {
    const response = await axios.get(`${BASE_URL}/db-check`);
    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

exports.recommendByPlace = async (req, res, next) => {
  try {
    const { place_id, top_n } = req.query;
    if (!place_id) {
      return res.status(400).json({ message: "place_id is required" });
    }
    const response = await axios.get(
      `${BASE_URL}/recommend/place/${place_id}?top_n=${top_n || 5}`
    );
    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

exports.recommendByUser = async (req, res, next) => {
  try {
    const { user_id, top_n } = req.query;
    if (!user_id) {
      return res.status(400).json({ message: "user_id is required" });
    }
    const response = await axios.get(
      `${BASE_URL}/recommend/user/${user_id}?top_n=${top_n || 5}`
    );
    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

exports.recommendByHybrid = async (req, res, next) => {
  try {
    const { user_id, top_n } = req.query;
    if (!user_id) {
      return res.status(400).json({ message: "user_id is required" });
    }
    const response = await axios.get(
      `${BASE_URL}/recommend/hybrid/${user_id}?top_n=${top_n || 5}`
    );
    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

exports.recommendNearby = async (req, res, next) => {
  try {
    const { lat, lon, top_n } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ message: "lat and lon are required" });
    }
    const response = await axios.get(
      `${BASE_URL}/recommend/nearby?lat=${lat}&lon=${lon}&top_n=${top_n || 5}`
    );
    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

exports.recommendByCategory = async (req, res, next) => {
  try {
    const { categories, top_n } = req.query;
    if (!categories) {
      return res.status(400).json({ message: "categories is required" });
    }
    const response = await axios.get(
      `${BASE_URL}/recommend/category?categories=${encodeURIComponent(categories)}&top_n=${top_n || 5}`
    );
    res.json(response.data);
  } catch (err) {
    next(err);
  }
};
