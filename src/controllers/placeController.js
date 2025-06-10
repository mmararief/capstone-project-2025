const { PrismaClient } = require("../generated/prisma");
const { ratingSchema } = require("../utils/validators");

const prisma = new PrismaClient();

exports.getPlaces = async (req, res, next) => {
  try {
    const places = await prisma.place.findMany();
    res.json(places);
  } catch (err) {
    next(err);
  }
};

exports.ratePlace = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { value } = ratingSchema.parse(req.body);
    const userId = req.user.id;

    const existingRating = await prisma.rating.findFirst({
      where: { userId, placeId: parseInt(id) },
    });

    let rating;
    if (existingRating) {
      // User has already rated this place
      return res.status(200).json({
        message: "You have already rated this place.",
        rating: existingRating,
      });
    } else {
      rating = await prisma.rating.create({
        data: {
          value,
          userId,
          placeId: parseInt(id),
        },
      });
    }

    res.json(rating);
  } catch (err) {
    next(err);
  }
};

exports.getUserRatings = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const ratings = await prisma.rating.findMany({
      where: { userId },
      include: { place: true },
    });
    res.json(ratings);
  } catch (err) {
    next(err);
  }
};
