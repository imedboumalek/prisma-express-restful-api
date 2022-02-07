import { Submission } from "@prisma/client";
import express from "express";
import dbclient from "../prisma-client";
import jwt from "jsonwebtoken";

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
// const getSubmissionsByAuthorId = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   const authorId = req.query.authorId;
//   console.log("getSubmissionsByAuthorId", authorId);
//   try {
//     const response = await dbclient.submission.findMany({
//       where: {
//         authors: {
//           some: {
//             id: parseInt(authorId.toString()),
//           },
//         },
//       },
//       include: {
//         authors: true,
//         topic: true,
//         conferences: true,
//         tags: true,
//       },
//     });
//     if (response) {
//       res.json(response);
//     } else {
//       res.status(404).json({
//         message: "Submission not found",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Internal server error",
//     });
//   }
// };
const checkAuthorization = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const auth = req.headers.authorization;

  if (auth) {
    const token = auth.split(" ")[1];
    console.log("checkAuthorization", token);
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      const { sub } = decoded;
      if (!sub || err) {
        res.status(401).json({
          message: "Unauthorized",
        });
        return;
      }
      req.body.userId = sub;
      next();
    });
  } else {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

const validateSubmissionsFields = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { title, resume, authors, topic, tags } = req.body;
  const msg: Map<string, string> = new Map();
  if (!title) {
    msg["title"] = "Title is required";
  }
  if (!authors) {
    msg["authors"] = "Authors required";
  }
  if (!topic) {
    msg["topic"] = "Topic required";
  }
  if (!resume) {
    msg["resume"] = "Resume required";
  }
  if (!tags) {
    msg["tags"] = "at least 1 tag required";
  }
  if (msg.size > 0) {
    res.status(400).json(msg);
    return;
  }
  console.log("validateSubmissionsFields success");

  next();
};
const createSubmission = async (
  req: express.Request,
  res: express.Response
) => {
  const userId = req.body.userId;
  const title: string = req.body.title;
  const resume: string = req.body.resume;
  const authors: number[] = req.body.authors;
  const topic: number = req.body.topic;
  const tags: number[] = req.body.tags;

  try {
    const response = await dbclient.submission.create({
      data: {
        title,
        resume,
        authors: {
          connect: [userId, ...authors].map((author) => ({ id: author })),
        },
        topic: {
          connect: { id: topic },
        },
        tags: {
          connect: tags.map((tag) => ({ id: tag })),
        },
      },
      include: {
        authors: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            username: true,
          },
        },
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

submissionsRouter.get("/submissions", getAllSubmissions);
submissionsRouter.get("/submissions/:id", getSubmissionById);
submissionsRouter.post(
  "/submissions",
  checkAuthorization,
  validateSubmissionsFields,
  createSubmission
);

export default submissionsRouter;
