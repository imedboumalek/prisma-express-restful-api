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
const express_1 = require("express");
const prisma_client_1 = __importDefault(require("../prisma-client"));
const submissionsRouter = (0, express_1.Router)();
submissionsRouter.get("/submissions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_client_1.default.submission
        .findMany({
        include: {
            authors: true,
            topic: true,
            conferences: true,
            tags: true,
        },
    })
        .then(res.json);
}));
const checkRequiredFields = (req, res, next) => {
    console.log("post submission");
    const { title, authors, topic, conferences, tags } = req.body;
    console.log("title", title);
    console.log("authors", authors);
    console.log("topic", topic);
    console.log("conferences", conferences);
};
submissionsRouter.post("/submissions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req);
    res.send("post submission");
}));
exports.default = submissionsRouter;
//# sourceMappingURL=submissions.js.map