import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './db';
import { contactRouter } from './routes/contact';

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contact', contactRouter);

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  const dbStates: Record<number, string> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  const dbStateNumber = mongoose.connection.readyState;
  const dbStatus = dbStates[dbStateNumber] || 'unknown';

  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: {
      status: dbStatus,
      connected: dbStateNumber === 1,
      host: mongoose.connection.host || null,
      name: mongoose.connection.name || null,
    },
  });
});

// Start Express server and connect to MongoDB
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`🚀 Portfolio backend server running on http://localhost:${PORT}`);
    console.log(`📡 Health check available at: http://localhost:${PORT}/api/health`);
    console.log(`✉️  Contact API available at: http://localhost:${PORT}/api/contact`);
  });

  // Connect to MongoDB in background
  connectDB().catch((err) => {
    console.error('Initial MongoDB connection error:', err);
  });
};

startServer();

// Handle graceful termination
process.on('SIGINT', async () => {
  console.log('\nShutting down server gracefully...');
  await mongoose.disconnect();
  process.exit(0);
});
