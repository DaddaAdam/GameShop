import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(process.env.CONNECTION_STRING, () =>
    console.log(`CONNECTED TO MONGODB!!!`)
  );
};

export default connectDB;
