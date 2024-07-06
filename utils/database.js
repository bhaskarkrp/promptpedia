import mongoose from "mongoose";

let isConnected = false;
export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Mongodb is already connected");
    return;
  }

  try {
    mongoose.connect(process.env.MONGOOSE_URI, {
      dbName: process.env.DB_NAME,
    });

    isConnected = true;
    console.log("Mongodb is connected");
  } catch (error) {
    console.log(`Error connecting to Mongodb server, error: ${error}`);
  }
};
