"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = __importDefault(require("./login"));
const signup_1 = __importDefault(require("./signup"));
const authRouter = (0, express_1.Router)();
authRouter.use("/auth", login_1.default, signup_1.default);
exports.default = authRouter;
//# sourceMappingURL=auth.js.map