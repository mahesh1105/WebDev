import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.auth.userId;
    // Find all the users except the current
    const users = await User.find({clerkId: {$ne: currentUserId}});
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}