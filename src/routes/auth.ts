import { Router } from "express";
import loginController from "../controllers/login";
import signUpController from "../controllers/signup";
const authRouter = Router();
const loginRouter = Router();
const signupRouter = Router();

loginRouter.post("/login", loginController);
loginRouter.all("/login", (req, res) => {
  // return method not allowed
  res.status(405).send({
    message: "Method not allowed",
  });
});

signupRouter.post("/signup", signUpController);
signUpController.all("/signup", (req, res) => {
  // return method not allowed
  res.status(405).send({
    message: "Method not allowed",
  });
});

authRouter.use("/auth", loginRouter, signupRouter);
export default authRouter;
