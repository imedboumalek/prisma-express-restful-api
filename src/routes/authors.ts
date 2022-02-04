/* eslint-disable @typescript-eslint/no-unused-vars */
import express from "express";
import jwt from "jsonwebtoken";
import dbclient from "../prisma-client";
import { getAllAuthors, getCurrentAuthor } from "../controllers/authors";
const authorsRouter = express.Router();
authorsRouter.get("/authors", getAllAuthors);
authorsRouter.get("/authors/current", getCurrentAuthor);

export default authorsRouter;
