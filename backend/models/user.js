import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name Is Required"],
  },
  email: {
    type: String,
    required: [true, "Email Is Required"],
  },
  password: {
    type: String,
    required: [true, "Password Is Required"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export const User = mongoose.model("User", userSchema);
