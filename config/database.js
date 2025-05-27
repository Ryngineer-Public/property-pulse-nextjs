import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  // only fields that are defined in the schema will be saved to the database
  mongoose.set("strictQuery", true);

  // If already connected, return
  if (connected) {
    console.log("MongoDB is already connected");
    return;
  }

  // connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export default connectDB;
// This function is used to connect to the MongoDB database
