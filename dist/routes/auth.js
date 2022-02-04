"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = __importDefault(require("../controllers/login"));
const signup_1 = __importDefault(require("../controllers/signup"));
const authRouter = (0, express_1.Router)();
const loginRouter = (0, express_1.Router)();
const signupRouter = (0, express_1.Router)();
loginRouter.post("/login", login_1.default);
loginRouter.all("/login", (req, res) => {
    // return method not allowed
    res.status(405).send({
        message: "Method not allowed",
    });
});
signupRouter.post("/signup", signup_1.default);
signup_1.default.all("/signup", (req, res) => {
    // return method not allowed
    res.status(405).send({
        message: "Method not allowed",
    });
});
authRouter.use("/auth", loginRouter, signupRouter);
exports.default = authRouter;
//# sourceMappingURL=auth.js.map