import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import mainRouter from "./routes/authors/authors";
import authRouter from "./routes/auth/auth";

dotenv.config();
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(mainRouter);
app.use(authRouter);
app.listen(process.env.PORT ?? 8080, () => {
  // console.log("hello");
  console.log(`Server is running on port ${process.env.PORT ?? 8080}`);
});
