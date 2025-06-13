import express from 'express'
import dotenv from 'dotenv'
import { adminRoutes, albumRoutes, authRoutes, songRoutes, statRoutes, userRoutes } from './routes/index.js'
import { connectDB } from './lib/db.js';
import { clerkMiddleware } from '@clerk/express'
import fileUpload from 'express-fileupload'
import path from 'path'

// If dotenv is imported and configured then only we can access data from it
dotenv.config();

const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT;

// To Parse req.body
app.use(express.json());

// This will add 'auth' to the 'req' object
// You can check which user is loggedIn or
// which user is sending the request by using "req.auth.userId"
app.use(clerkMiddleware());

// This middleware is used to handle the file uploading
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, "temp"), // this will create the temp folder in the specified directory
  createParentPath: true,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max file size
  }
}));

// Create the different files based on the routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/stats', statRoutes);

// Error Handler
app.use((err, req, res, next) => {
  res.status(500).json({ message : process.env.NODE_ENV === "production" ? "Internal Server error" : err.message });
})

// If we create all the routes over here, then code will become messier and harder to understand 
app.get('/', (req, res) => {
  res.send("Hello World!");
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
})

// todo: socket.io