import mongoose from 'mongoose';

// Cache database connection across serverless invocations
let isConnected = false;

async function connectToDatabase() {
  if (isConnected || mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables.');
  }
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
  });
  isConnected = true;
}

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const ContactMessage =
  mongoose.models.ContactMessage ||
  mongoose.model('ContactMessage', contactMessageSchema);

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      if (!process.env.MONGODB_URI) {
        return res.status(200).json({
          success: true,
          message: 'Contact API is active. (MONGODB_URI not yet configured on Vercel)',
          data: [],
        });
      }
      await connectToDatabase();
      const messages = await ContactMessage.find().sort({ createdAt: -1 }).limit(50);
      return res.status(200).json({ success: true, count: messages.length, data: messages });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, email, message } = req.body || {};
      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: name, email, and message are all required.',
        });
      }

      if (!process.env.MONGODB_URI) {
        return res.status(503).json({
          success: false,
          error: 'MongoDB is not configured yet on Vercel. Please add MONGODB_URI in your Vercel Project Settings > Environment Variables.',
        });
      }

      await connectToDatabase();
      const newMessage = await ContactMessage.create({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });

      return res.status(201).json({
        success: true,
        message: 'Thank you! Your message has been saved successfully.',
        data: {
          id: newMessage._id,
          name: newMessage.name,
          email: newMessage.email,
          createdAt: newMessage.createdAt,
        },
      });
    } catch (err: any) {
      console.error('Error saving contact message:', err);
      return res.status(500).json({
        success: false,
        error: err.message || 'Server error while saving message.',
      });
    }
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
