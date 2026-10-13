import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load atlas-credentials.env locally from the project root if present
const atlasEnvPath = path.resolve(process.cwd(), 'atlas-credentials.env');
if (fs.existsSync(atlasEnvPath)) {
  dotenv.config({ path: atlasEnvPath });
}
// Also load standard .env if present
dotenv.config();

let retryTimer: NodeJS.Timeout | null = null;

export const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('❌ MONGODB_URI is not defined in atlas-credentials.env or .env!');
    console.error('Please ensure MONGODB_URI is present in atlas-credentials.env in the project root.');
    return;
  }

  // Clear existing retry timer if any
  if (retryTimer) {
    clearTimeout(retryTimer);
    retryTimer = null;
  }

  try {
    console.log('🔄 Connecting to MongoDB server...');
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`✅ MongoDB connected successfully! Host: ${mongoose.connection.host}, DB: ${mongoose.connection.name}`);
  } catch (error: any) {
    console.error('❌ MongoDB Connection Error:', error.message);
    if (error.message.includes('SSL routines') || error.message.includes('whitelist') || error.message.includes('tlsv1 alert internal error')) {
      console.warn('\n⚠️  MongoDB Atlas IP Whitelist Notice:');
      console.warn('MongoDB Atlas requires your current public IP address to be whitelisted.');
      console.warn('To resolve this:');
      console.warn('1. Log in to your MongoDB Atlas dashboard (https://cloud.mongodb.com)');
      console.warn('2. Navigate to "Network Access" under "Security"');
      console.warn('3. Click "Add IP Address" and either:');
      console.warn('   - Click "Add Current IP Address", or');
      console.warn('   - Add "0.0.0.0/0" to allow access from any IP during development');
      console.warn('4. Save and allow 1-2 minutes for the rule to apply.\n');
    }

    console.log('🔄 Retrying MongoDB connection in 5 seconds...');
    retryTimer = setTimeout(() => {
      connectDB().catch(() => {});
    }, 5000);
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected. Attempting reconnect...');
  if (!retryTimer) {
    retryTimer = setTimeout(() => {
      connectDB().catch(() => {});
    }, 5000);
  }
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconnected');
});
