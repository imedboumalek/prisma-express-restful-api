import express from "express";
import dbclient from "../prisma-client";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { Author } from "@prisma/client";
const router = express.Router();
const checkRequiredFieldsForSignIn = (req, res, next) => {
  console.log("login");

  const { username, password } = req.body;
  console.log("username", username);
  console.log("password", password);

  if (!username || !password) {
    res.status(400).json({
      message: "Please provide username and password",
    });
    return;
  }
  next();
};

const checkUserExistance = async (req, res, next) => {
  const { username } = req.body;
  const user = await dbclient.author.findFirst({
    where: {
      username: username,
    },
  });
  if (!user) {
    res.status(403).json({
      message: "Invalid username or password",
    });
    return;
  }
  res.locals.user = user;
  next();
};
const checkPassword = async (req, res, next) => {
  const { password } = req.body;
  const user: Author = res.locals.user;
  const hashedPassword = await bcrypt.hash(password, user.salt);
  const isPasswordValid = hashedPassword === user.password;
  console.log("isPasswordValid", isPasswordValid);

  if (!isPasswordValid) {
    res.status(403).json({
      message: "Username or password is incorrect",
    });
    return;
  }

  next();
};

const returnJWT = async (req, res) => {
  const user: Author = res.locals.user;
  const token = jsonwebtoken.sign(
    {
      sub: user.id,
      username: user.username,
      iat: Math.floor(Date.now() / 1000),
    },
    process.env.JWT_SECRET
  );

  res.status(200).json({
    access_token: token,
  });
};

router.post(
  "/login",
  checkRequiredFieldsForSignIn,
  checkUserExistance,
  checkPassword,
  returnJWT
);

router.all("/login", (req, res) => {
  // return method not allowed
  res.status(405).send({
    message: "Method not allowed",
  });
});
export default router;
