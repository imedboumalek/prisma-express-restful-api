import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import mainRouter from "./routes/authors/authors";
import authRouter from "./routes/auth/auth";

import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./swagger-config";
import prisma from "./prisma-client";

async function main() {
  dotenv.config();
  await prisma.$connect().then(() => {
    console.log("connected to prisma");
  });

  const app = express();
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
  app.use(mainRouter);
  app.use(authRouter);
  app.listen(process.env.PORT ?? 8080, () => {
    // console.log("hello");
    console.log(`Server is running on port ${process.env.PORT ?? 8080}`);
  });
}

main().finally(() => {
  prisma.$disconnect();
});
