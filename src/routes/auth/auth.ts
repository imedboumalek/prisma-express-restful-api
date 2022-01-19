import { Router } from "express";
import loginRouter from "./login";
import signupRouter from "./signup";
const authRouter = Router();
authRouter.use("/auth", loginRouter, signupRouter);

export default authRouter;
