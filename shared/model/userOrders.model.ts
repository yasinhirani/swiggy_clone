import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  userId: String,
  orders: []
});

const users = mongoose.models.Users || mongoose.model("Users", userSchema);
export default users;
