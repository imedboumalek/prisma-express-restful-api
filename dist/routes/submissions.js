"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_client_1 = __importDefault(require("../prisma-client"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const submissionsRouter = express_1.default.Router();
const getAllSubmissions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma_client_1.default.submission.findMany({
            include: {
                authors: true,
                topic: true,
                conferences: true,
                tags: true,
            },
        });
        res.json(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});
const getSubmissionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const submissionId = req.params.id;
    try {
        const response = yield prisma_client_1.default.submission.findUnique({
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
        }
        else {
            res.status(404).json({
                message: "Submission not found",
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});
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
const checkAuthorization = (req, res, next) => {
    const auth = req.headers.authorization;
    if (auth) {
        const token = auth.split(" ")[1];
        console.log("checkAuthorization", token);
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
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
    }
    else {
        res.status(401).json({
            message: "Unauthorized",
        });
    }
};
const validateSubmissionsFields = (req, res, next) => {
    const { title, resume, authors, topic, tags } = req.body;
    const msg = new Map();
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
const createSubmission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("createSubmission", req.body);
});
submissionsRouter.get("/submissions", getAllSubmissions);
submissionsRouter.get("/submissions/:id", getSubmissionById);
submissionsRouter.post("/submissions", validateSubmissionsFields, checkAuthorization, createSubmission);
exports.default = submissionsRouter;
//# sourceMappingURL=submissions.js.map