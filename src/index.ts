import express, { Request, Response } from "express";
import dotenv from "dotenv";
import ClassRoutes from "./routes/ClassRoutes";
import MyUserRoutes from "./routes/MyUserRoutes";
import MyAdminRoutes from "./routes/MyAdminRoutes";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => {
    console.log("Connected to databases");
  })
  .catch((err: any) => {
    console.error(err);
  });

// Routes
// app.use("/api/classes", classRoutes);
app.use("/api/my/user", MyUserRoutes);
app.use("/api/admin", MyAdminRoutes);
app.use("api/class", ClassRoutes);

// route to check server is working
app.get("/health", (req: Request, res: Response) => {
  res.send({ message: "Health is Ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
