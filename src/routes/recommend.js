const express = require("express");
const router = express.Router();
const recommendController = require("../controllers/recommendController");

router.get("/db-check", recommendController.dbCheck);
router.get("/by_place", recommendController.recommendByPlace);
router.get("/by_user", recommendController.recommendByUser);
router.get("/by_hybrid", recommendController.recommendByHybrid);
router.get("/nearby", recommendController.recommendNearby);
router.get("/by_category", recommendController.recommendByCategory);

module.exports = router;
