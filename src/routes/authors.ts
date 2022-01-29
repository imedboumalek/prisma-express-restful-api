/* eslint-disable @typescript-eslint/no-unused-vars */
import express from "express";
import jwt from "jsonwebtoken";
import dbclient from "../prisma-client";
const authorsRouter = express.Router();
authorsRouter.get("/authors", (req, res) => {
  dbclient.author
    .findMany({
      include: {
        country: true,
        org: true,
      },
    })
    .then((authors) => {
      const authorsFiltered = authors.map((e) => {
        const {
          createdAt,
          updatedAt,
          username,
          email,
          password,

          salt,
          ...theRest
        } = e;

        return theRest;
      });
      res.json(authorsFiltered);
    });
});
authorsRouter.get("/authors/current", (req, res) => {
  // validate headers
  const auth = req.headers.authorization;
  if (!auth) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  const token = auth.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }
    dbclient.author
      .findFirst({
        where: {
          username: decoded["username"],
        },
        include: {
          country: true,
          org: true,
          submissions: {
            include: {
              topic: true,
              conferences: true,
              tags: true,
            },
          },
        },
      })
      .then((author) => {
        const { salt, password, ...theRest } = author;
        res.json(theRest);
      });
  });
});

export default authorsRouter;
