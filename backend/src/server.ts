import express from "express";
import sportRoutes from "./routes/sport.routes";
import userRoutes from "./routes/user.routes";

import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT || 5000;

import cors from "cors";
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.options("*", cors(corsOptions));

app.listen(PORT, () => {
  console.log(`Server on ${PORT}`);
});

//app.use("/api/user", userRoutes);
app.use("/api/user", userRoutes);
app.use("/api/sport", sportRoutes);
