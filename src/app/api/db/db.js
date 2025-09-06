import mongoose from "mongoose";

const connectionStr = process.env.MONGO_URL;
console.log(connectionStr)

let isConnected = false; 

const connectDB = async () => {
  if (isConnected) {
    // If already connected, skip reconnecting
    return;
  }

  try {
    const db = await mongoose.connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState === 1;
    console.log(" MongoDB Connected:", db.connection.host);
  } catch (error) {
    console.error(" MongoDB connection error!!!!", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectDB;
