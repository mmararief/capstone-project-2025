const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth");
const placesRoutes = require("./routes/places");

const recommendRoutes = require("./routes/recommend");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/places", placesRoutes);
app.use("/recommend", recommendRoutes);
app.use('/', express.static('docs'));
app.use(errorHandler);

module.exports = app;
