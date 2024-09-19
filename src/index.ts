import express, { Request, Response } from "express";
import dotenv from "dotenv";
import ClassRoutes from "./routes/ClassRoutes";
import MyUserRoutes from "./routes/MyUserRoutes";
import MyAdminRoutes from "./routes/MyAdminRoutes";
import mongoose from "mongoose";
import cors from "cors";
import cluster from "cluster";
import http from "http";
import os from "os";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger-output.json";

const numCpus = os.cpus().length;

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

// Store OTPs in a simple in-memory object
export const otpStore: Record<string, string> = {};

var options = {
  explorer: true,
};

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);
// Routes
// app.use("/api/classes", classRoutes);
app.use("/api/my/user", MyUserRoutes);
app.use("/api/admin", MyAdminRoutes);
app.use("/api/class", ClassRoutes);
// app.use("api/enrollment");

// route to check server is working
app.get("/health", (req: Request, res: Response) => {
  res.send({ message: "Health is Ok" });
});

// if (cluster.isPrimary) {
//   console.log(`Master process ${process.pid} is running`);
//   for (let i = 0; i < numCpus; i++) {
//     cluster.fork();
//   }
//   console.log(`woker process ${process.pid}`);

//   cluster.on("exit", function (worker) {
//     console.log(`Worker process ${worker.process.pid} died. Restarting...`);
//     cluster.fork();
//   });
// } else {
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// }
