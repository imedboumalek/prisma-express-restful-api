import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import mainRouter from "./routes/authors/authors";
import authRouter from "./routes/auth/auth";
import countryRouter from "./routes/countries/countries";

import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./swagger-config";
import dbclient from "./prisma-client";

async function main() {
  dotenv.config();
  await dbclient.$connect().then(() => {
    console.log("connected to prisma");
  });

  const app = express();
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
  app.use(mainRouter);
  app.use(countryRouter);
  app.use(authRouter);
  app.listen(process.env.PORT ?? 8080, () => {
    // console.log("hello");
    console.log(`Server is running on port ${process.env.PORT ?? 8080}`);
  });
}

main().finally(() => {
  dbclient.$disconnect();
});
