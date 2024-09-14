import express from "express";
import dotenv from "dotenv";
// import classRoutes from "./routes/classRoutes";
import MyUserRoutes from "./routes/MyUserRoutes";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

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

// Basic route
app.get("/", (req, res) => {
  res.send("Virtual Classroom API");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
