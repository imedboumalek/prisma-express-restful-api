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
const getSubmissionsByAuthorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = req.query.authorId;
    console.log("getSubmissionsByAuthorId", authorId);
    try {
        const response = yield prisma_client_1.default.submission.findMany({
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
submissionsRouter.get("/submissions/:id", getSubmissionById);
submissionsRouter.get("/submissions", getAllSubmissions);
submissionsRouter.get("/submissions?", getSubmissionsByAuthorId);
submissionsRouter.post("/submissions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("post submission");
}));
exports.default = submissionsRouter;
//# sourceMappingURL=submissions.js.map