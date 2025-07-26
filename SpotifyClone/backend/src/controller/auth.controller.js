import { User } from '../models/user.model.js'

// Check if the user exists - if not then sign up
export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    if (!id || !firstName || !lastName) {
      return res.status(401).json({ success: false, message: "Missing user data" });
    }

    // Check If the user already exists
    const user = await User.findOne({ clerkId: id });

    if(!user) {
      // SignUp
      await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl
      })
    }

    return res.status(200).json({success: true, message: "User authenticated successfully"});
  } catch(error) {
    console.log("Error in auth callback: ", error);
    next(error);
  }
}