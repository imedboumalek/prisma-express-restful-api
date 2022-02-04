import express from "express";
import dbclient from "../prisma-client";

const submissionsRouter = express.Router();

const getAllSubmissions = async (
  req: express.Request,
  res: express.Response
) => {
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
};
const getSubmissionById = async (
  req: express.Request,
  res: express.Response
) => {
  const submissionId = req.params.id;
  try {
    const response = await dbclient.submission.findUnique({
      where: {
        id: parseInt(submissionId),
      },
      include: {
        authors: true,
        topic: true,
        conferences: true,
        tags: true,
      },
    });
    if (response) {
      res.json(response);
    } else {
      res.status(404).json({
        message: "Submission not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
const getSubmissionsByAuthorId = async (
  req: express.Request,
  res: express.Response
) => {
  const authorId = req.query.authorId;
  console.log("getSubmissionsByAuthorId", authorId);
  try {
    const response = await dbclient.submission.findMany({
      where: {
        authors: {
          some: {
            id: parseInt(authorId.toString()),
          },
        },
      },
      include: {
        authors: true,
        topic: true,
        conferences: true,
        tags: true,
      },
    });
    if (response) {
      res.json(response);
    } else {
      res.status(404).json({
        message: "Submission not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

submissionsRouter.get("/submissions", getAllSubmissions);
submissionsRouter.get("/submissions?", getSubmissionsByAuthorId);
submissionsRouter.get("/submissions/:id", getSubmissionById);
submissionsRouter.post("/submissions", async (req, res) => {
  res.send("post submission");
});

export default submissionsRouter;
