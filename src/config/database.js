const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'info_jakarta',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

async function connect() {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL database');
    return sequelize;
  } catch (error) {
    console.error('PostgreSQL connection error:', error);
    throw error;
  }
}

async function disconnect() {
  try {
    await sequelize.close();
    console.log('Disconnected from PostgreSQL database');
  } catch (error) {
    console.error('Error disconnecting from database:', error);
    throw error;
  }
}

module.exports = {
  sequelize,
  connect,
  disconnect
}; 