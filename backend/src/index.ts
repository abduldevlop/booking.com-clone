import { app } from "./app";
import { connectDB } from "./database";
import dotenv from "dotenv";
dotenv.config();

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🟩 Server running att http://localhost:${PORT}`);
    });
  })
  .catch(() => {
    console.log("🔴 Databse connection error ");
  });
