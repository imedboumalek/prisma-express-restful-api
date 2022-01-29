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
  console.log("post submission");
  const { title, authors, topic, conferences, tags } = req.body;
  console.log("title", title);
  console.log("authors", authors);
  console.log("topic", topic);
  console.log("conferences", conferences);
};
submissionsRouter.post("/submissions", async (req, res) => {
  console.log(req);
  res.send("post submission");
});

export default submissionsRouter;
