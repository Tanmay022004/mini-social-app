import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// 1. Load environment variables IMMEDIATELY
dotenv.config(); 

import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';

const app = express();

// 2. Global Middleware (Add the limit lines right here!)
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// 3. API Routes (Must come AFTER the middleware configuration)
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Debugging Line
console.log("Connecting to URI:", process.env.MONGO_URI);

// MongoDB Connection
if (!process.env.MONGO_URI) {
  console.error("CRITICAL ERROR: MONGO_URI is not defined in your .env file!");
} else {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));