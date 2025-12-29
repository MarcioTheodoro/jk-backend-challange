import 'dotenv/config';
import "reflect-metadata";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/authRoutes";
import { setupSwagger } from './utils/swagger';
import { AppDataSource } from "./database/data-source";
import { errorMiddleware } from "./middlewares/ErrorMiddleware";

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/users", userRoutes);
  app.use("/users/auth", authRoutes);

  app.use(errorMiddleware);

  setupSwagger(app);

  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
});
