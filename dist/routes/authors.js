"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = __importDefault(require("express"));
const authors_1 = require("../controllers/authors");
const authorsRouter = express_1.default.Router();
authorsRouter.get("/authors", authors_1.getAllAuthors);
authorsRouter.get("/authors/current", authors_1.getCurrentAuthor);
exports.default = authorsRouter;
//# sourceMappingURL=authors.js.map