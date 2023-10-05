import mongoose from "mongoose";

export const connect = async () => {
  await mongoose.connect(process.env.MONGODB_CONNECT_URI!);
};
