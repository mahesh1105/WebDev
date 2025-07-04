import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true
    }, // Clerk user ID
    receiverId: {
      type: String,
      required: true
    }, // Clerk user ID
    content: {
      type: String,
      required: true
    },
  }, 
  {timestamps: true} // createdAt, updatedAt
);

export const Message = mongoose.model("Message", messageSchema);