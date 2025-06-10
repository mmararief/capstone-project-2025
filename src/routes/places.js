const express = require("express");
const router = express.Router();
const { PrismaClient } = require("../generated/prisma");
const placeController = require("../controllers/placeController");
const { authenticate } = require("../middlewares/auth");

const prisma = new PrismaClient();

// Get all places
router.get("/", async (req, res, next) => {
  try {
    const places = await prisma.place.findMany({
      include: { ratings: true },
    });
    // Tambahkan rata-rata rating ke setiap place
    const placesWithAvgRating = places.map(place => {
      const ratings = place.ratings.map(r => r.value);
      const avgRating = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length) : null;
      return {
        ...place,
        avgRating,
        ratings: undefined, // opsional: hilangkan array ratings jika tidak ingin tampil
      };
    });
    res.json(placesWithAvgRating);
  } catch (err) {
    next(err);
  }
});

// Get place by ID and show user's rating if available
router.get("/:id", authenticate, async (req, res, next) => {
  try {
    const placeId = parseInt(req.params.id);
    const userId = req.user.id;
    const place = await prisma.place.findUnique({
      where: { id: placeId },
      include: { ratings: true },
    });
    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }
    // Hitung rata-rata rating
    const ratings = place.ratings.map(r => r.value);
    const avgRating = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length) : null;
    // Cari rating user pada tempat ini
    const userRating = place.ratings.find(r => r.userId === userId);
    // Hilangkan array ratings dari response
    const { ratings: _, ...placeWithoutRatings } = place;
    res.json({
      ...placeWithoutRatings,
      avgRating,
      userRating: userRating ? userRating.value : null
    });
  } catch (err) {
    next(err);
  }
});

// Create new place
router.post("/", async (req, res, next) => {
  try {
    const place = await prisma.place.create({
      data: req.body,
    });
    res.status(201).json(place);
  } catch (err) {
    next(err);
  }
});

// Update place
router.put("/:id", async (req, res, next) => {
  try {
    const place = await prisma.place.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(place);
  } catch (err) {
    next(err);
  }
});

// Delete place
router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.place.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// Rate a place
router.post("/:id/rate", authenticate, placeController.ratePlace);

// Get all ratings by the authenticated user
router.get("/my/ratings", authenticate, placeController.getUserRatings);

module.exports = router;
