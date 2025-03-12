import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import "dotenv/config";

import { ErrorResponse, SuccessResponse } from "./utils/response";
import connect from "./config/db";
import authRouter from "./routes/auth.routes";
import protect from "./middleware/auth-middleware";
import imageRouter from "./routes/image.routes";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: "*",
    credentials: true,
  })
);

// serving images
app.use(express.static("uploads"));

const PORT = Number(process.env.PORT) || 5001;

app.get("/", (req, res) => {
  res.status(200).json(new SuccessResponse(200, "Server is up and running"));
});

app.use("/api/auth", authRouter);

app.use(
  "/api/images",
  (req, res, next) => {
    protect(req, res, next);
  },
  imageRouter
);

app.use("*", (req, res) => {
  res.status(404).json(new ErrorResponse(404, "Resource does not exists"));
});

async function start() {
  await connect();
  app.listen(PORT, () =>
    console.log(`Server started on http://localhost:${PORT} 🚀🚀`)
  );
}

start();
