import dbclient from "../prisma-client";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { Author } from "@prisma/client";
import { Router } from "express";
const checkRequiredFieldsForSignIn = (req, res, next) => {
  const { username, password } = req.body;

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
export const checkPassword = async (req, res, next) => {
  const { password } = req.body;
  const user: Author = res.locals.user;
  const hashedPassword = await bcrypt.hash(password, user.salt);
  const isPasswordValid = hashedPassword === user.password;

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

export default Router().use(
  checkRequiredFieldsForSignIn,
  checkUserExistance,
  checkPassword,
  returnJWT
);
