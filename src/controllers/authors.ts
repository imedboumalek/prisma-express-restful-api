/* eslint-disable @typescript-eslint/no-unused-vars */
import dbclient from "../prisma-client";
import express from "express";
import jwt from "jsonwebtoken";

export const getAllAuthors = async (
  req: express.Request,
  res: express.Response
) => {
  dbclient.author
    .findMany({
      include: {
        country: true,
        org: true,
        submissions: true,
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
};

export const getCurrentAuthor = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
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
          id: parseInt(decoded["sub"].toString()),
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
};
