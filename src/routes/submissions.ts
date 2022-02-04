import { Router } from "express";
import dbclient from "../prisma-client";

const submissionsRouter = Router();

submissionsRouter.get("/submissions", async (req, res) => {
  await dbclient.submission
    .findMany({
      include: {
        authors: true,
        topic: true,
        conferences: true,
        tags: true,
      },
    })
    .then(res.json);
});
const checkRequiredFields = (req, res, next) => {
  const { title, authors, topic, conferences, tags } = req.body;
};
submissionsRouter.post("/submissions", async (req, res) => {
  res.send("post submission");
});

export default submissionsRouter;
