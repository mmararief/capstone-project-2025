const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const placeRoutes = require('./routes/place.routes');
const recommendRoutes = require('./routes/recommend.routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/places', placeRoutes);
app.use('/recommend', recommendRoutes);

app.use(errorMiddleware);

module.exports = app;