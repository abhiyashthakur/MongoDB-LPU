const createApp = require('./app');
const connectDB = require('./config/db');
const config = require('./config');

const app = createApp();

async function startServer() {
  try {
    await connectDB(config.mongoUri);

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();
