import express from "express";
import dbclient from "../prisma-client";

const submissionsRouter = express.Router();

submissionsRouter.get("/submissions", async (req, res) => {
  try {
    const response = await dbclient.submission.findMany({
      include: {
        authors: true,
        topic: true,
        conferences: true,
        tags: true,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});
const checkRequiredFields = (req, res, next) => {
  const { title, authors, topic, conferences, tags } = req.body;
};
submissionsRouter.post("/submissions", async (req, res) => {
  res.send("post submission");
});

export default submissionsRouter;
