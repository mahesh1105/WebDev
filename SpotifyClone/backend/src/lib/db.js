import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB ${conn.connection.host}`);
  } catch (error) {
    console.log("Failed to Connect to MongoDB", error);
    // 1 is Failure and 0 is Success
    process.exit(1);
  }
}