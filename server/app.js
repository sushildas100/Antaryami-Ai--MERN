import express from "express";
import mongoose from "mongoose";
import requestIp from "request-ip";
import "dotenv/config";
import cros from "cors";

const MONGODB_URL = `mongodb+srv://kuddul0:7TY5Zs00ISBkJuuS@antaryami.cppb25o.mongodb.net/?retryWrites=true&w=majority&appName=Antaryami`;
const PORT_NO = 3030;

const app = express();

app.use(express.json());
app.use(requestIp.mw());

const originUrl = process.env.CLIENT_REDIRECT_URL;

const crosOption = {
  origin: originUrl,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cros(crosOption));

import publicRoutes from "./router/public.js";
import authRoutes from "./router/auth.js";

app.use("/gemini", publicRoutes);
app.use(authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data, error: error });
});

mongoose
  .connect(MONGODB_URL)
  .then((result) => {
    app.listen(process.env.PORT || PORT_NO, () => {
      console.log(`Antaryami server is running on port ${PORT_NO}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
