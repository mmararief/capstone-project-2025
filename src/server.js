const express = require('express');
const cors = require('cors');
const { connect, disconnect } = require('./config/database');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth.routes');
const placeRoutes = require('./routes/place.routes');
const recommendRoutes = require('./routes/recommend.routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/recommendations', recommendRoutes);

// Error handling
app.use(errorMiddleware);

// Start server
async function startServer() {
  try {
    await connect();
    // Sync database models
    await sequelize.sync({ alter: true });
    console.log('Database models synchronized');
    
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  await disconnect();
  process.exit(0);
});

startServer();