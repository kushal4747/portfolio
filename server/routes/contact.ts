import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { ContactMessage } from '../models/ContactMessage';

export const contactRouter = Router();

// POST /api/contact - Save contact form submission
contactRouter.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, and message are all required.',
      });
      return;
    }

    // Check if database is currently connected
    if (mongoose.connection.readyState !== 1) {
      res.status(503).json({
        success: false,
        error: 'Database is currently unavailable. Please verify MongoDB connection/whitelist status.',
      });
      return;
    }

    const newMessage = await ContactMessage.create({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been saved successfully.',
      data: {
        id: newMessage._id,
        name: newMessage.name,
        email: newMessage.email,
        createdAt: newMessage.createdAt,
      },
    });
  } catch (error: any) {
    console.error('Error saving contact message:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error while saving message.',
    });
  }
});

// GET /api/contact - List contact messages (for verification/admin use)
contactRouter.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    if (mongoose.connection.readyState !== 1) {
      res.status(503).json({
        success: false,
        error: 'Database is currently unavailable.',
      });
      return;
    }

    const messages = await ContactMessage.find().sort({ createdAt: -1 }).limit(50);
    res.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error: any) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error while fetching messages.',
    });
  }
});
