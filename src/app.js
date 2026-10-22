const express = require('express');
const healthRoutes = require('./routes/health.routes');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');

function createApp() {
  const app = express();

  app.use(express.json());

  app.get('/health', (req, res) => {
    res.status(200).json({
      message: 'Hello, world!'
    });
  });

  app.use('/api/health', healthRoutes);
  app.use('/api', userRoutes);
  app.use('/api/products', productRoutes);

  app.use((req, res) => {
    res.status(404).json({
      message: 'Route not found'
    });
  });

  return app;
}

module.exports = createApp;
