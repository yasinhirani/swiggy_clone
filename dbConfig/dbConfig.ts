import mongoose from "mongoose";

export const connect = async () => {
  await mongoose.connect(
    "mongodb+srv://hiraniyasin3854:CxjjnMOa9NmGQmBr@cluster0.e9etrys.mongodb.net/?retryWrites=true&w=majority"
  );
};
