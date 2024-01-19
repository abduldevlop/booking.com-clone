import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.DB_URI as string
    );
    console.log(
      "🟢 Database Connect Sucsessfully! DB Host -",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log("🔴Databse connection Faild ", error);
    process.exit();
  }
};
