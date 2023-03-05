import express, { Request, Response, NextFunction } from "express";
import sportRoutes from "./routes/sport.routes";
import userRoutes from "./routes/user.routes";

import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: `${process.env.CLIENT_URL}`,
  credentials: true,
};

app.use((req: Request, res: Response, next: NextFunction) => {
  // Set the Access-Control-Allow-Origin header to allow requests from all origins
  res.setHeader("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
  // Set the Access-Control-Allow-Methods header to allow the HTTP methods used in the request
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  // Set the Access-Control-Allow-Headers header to allow the headers used in the request
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(cors(corsOptions));

app.use(cookieParser());

app.options("*", cors(corsOptions));

app.listen(PORT, () => {
  console.log(`Server on ${PORT}`);
});

app.use("/api/user", userRoutes);
app.use("/api/sport", sportRoutes);
