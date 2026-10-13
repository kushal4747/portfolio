import mongoose from 'mongoose';

export default async function handler(_req: any, res: any) {
  const dbStates: Record<number, string> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  const dbStateNumber = mongoose.connection.readyState;
  const dbStatus = dbStates[dbStateNumber] || 'unknown';

  return res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    platform: 'vercel-serverless',
    database: {
      status: dbStatus,
      connected: dbStateNumber === 1,
      host: mongoose.connection.host || null,
      name: mongoose.connection.name || null,
    },
  });
}
