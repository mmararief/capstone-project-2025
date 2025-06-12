const { 
  getAllPlaces,
  getPlaceById,
  ratePlace 
} = require('../services/place.service');
const { ratePlaceSchema } = require('../validations/place.validation');

exports.getAllPlaces = async (req, res, next) => {
  try {
    const places = await getAllPlaces();
    res.json(places);
  } catch (err) {
    next(err);
  }
};

exports.getPlaceById = async (req, res, next) => {
  try {
    const place = await getPlaceById(parseInt(req.params.id));
    if (!place) return res.status(404).json({ message: 'Place not found' });
    res.json(place);
  } catch (err) {
    next(err);
  }
};

exports.ratePlace = async (req, res, next) => {
  try {
    const { error } = ratePlaceSchema.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    const userId = req.user.id;
    const placeId = parseInt(req.params.id);
    const { score } = req.body;
    
    const rating = await ratePlace(userId, placeId, score);
    res.json(rating);
  } catch (err) {
    next(err);
  }
};