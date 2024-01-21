import express from "express";
const app = express();

import cors from "cors";
import cookieParser from "cookie-parser";

// routes imports
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173", // replace with your actual frontend origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // enable set cookie
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(cookieParser());

// routes implementation
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

export { app };
