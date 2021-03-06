import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import authorsRouter from "./routes/authors";
import authRouter from "./routes/auth";
import countryRouter from "./routes/countries";
import submissionsRouter from "./routes/submissions";
import docs from "./swagger-config";
import dbclient from "./prisma-client";
import helmet from "helmet";

const app = express();
// async function main() {
dotenv.config();
dbclient.$connect().then(() => {
  console.log("connected to prisma");
});

if (process.env.NODE_ENV == "dev") {
  app.use(logger("dev"));
}
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(docs);
app.use(countryRouter);
app.use(authRouter);
app.use(authorsRouter);
app.use(submissionsRouter);
app.listen(process.env.PORT ?? 5000, () => {
  console.log(`Server is running on port ${process.env.PORT ?? 5000}`);
});
// }

// main().finally(() => {
//   dbclient.$disconnect();
// });

export default app;
