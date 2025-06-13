import { clerkClient } from '@clerk/express';

// This function will check if the user is authenticated or login
export const protectRoute = async (req, res, next) => {
  if(!req.auth.userId) {
    return res.status(401).json({ message: "Unauthorized - You must be logged in" });
  }

  next();
}

// This function will check if the user is admin
export const requireAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

    if(!isAdmin) {
      return res.status(403).json({ message: "Unauthorized - You must be an admin" });
    }

    next();
  } catch(error) {
    next(error);
  }
}