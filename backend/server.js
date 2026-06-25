const app = require('./src/app');
const connectDB = require('./src/config/db');
const env = require('./src/config/env');

const startServer = async () => {
  try {
    await connectDB();

    app.listen(env.port, () => {
      console.log(`Server running in ${env.nodeEnv} mode on port ${env.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
