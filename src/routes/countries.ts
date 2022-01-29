import { Router } from "express";
import dbclient from "../prisma-client";
const countryRouter = Router();
export default countryRouter
  .get("/countries", async (req, res) => {
    const countries = await dbclient.country.findMany();
    res.json(countries);
  })
  .all("/countries", (req, res) => {
    res.status(405).send("method not allowed");
  });
