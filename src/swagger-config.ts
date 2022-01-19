import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Conference/article submission API made with express",
      version: "0.1.0",
      description:
        " CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      {
        url: "http://localhost:8080/",
      },
    ],
  },
  apis: ["./routes/*"],
};
const router = express.Router();
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
export default router;
