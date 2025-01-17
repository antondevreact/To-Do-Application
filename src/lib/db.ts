import mongoose from "mongoose";

export const connectDb = async () => {
  const dbUri = process.env.MONGODB_URI;

  if (!dbUri) {
    throw new Error("MONGODB_URI is not defined in the environment variables");
  }

  await mongoose.connect(dbUri);
};
