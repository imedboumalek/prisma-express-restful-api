import { Router } from "express";
import loginController from "../controllers/login";
import signUpController from "../controllers/signup";
const authRouter = Router();

authRouter.post("/auth/login", loginController);
authRouter.all("/auth/login", (req, res) => {
  // return method not allowed
  res.status(405).send({
    message: "Method not allowed",
  });
});

authRouter.post("/auth/signup", signUpController);
authRouter.all("/auth/signup", (req, res) => {
  // return method not allowed
  res.status(405).send({
    message: "Method not allowed",
  });
});

export default authRouter;
