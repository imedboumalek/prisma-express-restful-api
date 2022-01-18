import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import mainRouter from "./routes/authors/authors";
dotenv.config();
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(mainRouter);
app.listen(process.env.PORT ?? 8080, () => {
  console.log("hello world");

  console.log(`Server is running on port ${process.env.PORT ?? 8080}`);
});

module.exports = app;
