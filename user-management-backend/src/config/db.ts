import mongoose, { MongooseError } from "mongoose";

export default async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
