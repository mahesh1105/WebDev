import { User } from '../models/user.model.js'

// Check if the user exists - if not then sign up
export const authCallback = async (req, res) => {
  try {
    const {id, firstName, lastName, imageUrl} = req.body;

    // Check If the user already exists
    const user = await UserActivation.findOne({clerkId: id});

    if(!user) {
      // SignUp
      await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl
      })
    }

    res.status(200).json({success: true});
  } catch(error) {
    console.log("Error in auth callback", error);
    next(error);
  }
}