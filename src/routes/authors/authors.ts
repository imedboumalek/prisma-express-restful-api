/* eslint-disable @typescript-eslint/no-unused-vars */
import express from "express";
import dbclient from "../../prisma-client";
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
          jwt,
          salt,
          ...theRest
        } = e;

        return theRest;
      });
      res.json(authorsFiltered);
    });
});
authorsRouter.get("/authors/current", (req, res) => {
  res.send("respond with a resource");
});

export default authorsRouter;
