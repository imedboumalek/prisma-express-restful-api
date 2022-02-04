import prisma from "../prisma-client";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { Router } from "express";

const checkRequiredFieldsForSignUp = (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(403).json({
      message: "Please provide username, email and password",
    });
    return;
  }

  next();
};

const validateSignUpCredentials = async (req, res, next) => {
  const { username, password, email, first_name, last_name } = req.body;
  let response: Map<string, string>;
  if (typeof username !== "string" || username.length < 3) {
    response["username"] =
      "Username must be a string & at least 3 characters long";
  }
  if (typeof password !== "string" || password.length < 8) {
    response["password"] = "Password must be at least 8 characters long";
  }
  if (typeof email !== "string" || !email.includes("@")) {
    response["email"] = "Email must be a valid email";
  }
  if (first_name && typeof first_name !== "string") {
    response["first_name"] = "First name must be a string";
  }
  if (last_name && typeof last_name !== "string") {
    response["last_name"] = "Last name must be a string";
  }

  if (response) {
    res.status(403).json(response);
    return;
  }
  next();
};

const checkIfCredsAreUsed = async (req, res, next) => {
  const { username, email } = req.body;
  const usedCredentials =
    (await prisma.author.count({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    })) !== 0;

  if (usedCredentials) {
    res.status(403).json({
      message: "Username or email already exists",
    });
    return;
  }
  next();
};
const signup = async (req, res) => {
  const { username, email, password, first_name, last_name, countryId, orgId } =
    req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newAuthor = await prisma.author
    .create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
        first_name: first_name,
        last_name: last_name,
        salt: salt,
        countryId: countryId,
        orgId: orgId,
      },
    })
    .then((author) => {
      const { salt, password, ...therest } = author;
      return therest;
    });
  const token = jsonwebtoken.sign(
    {
      sub: newAuthor.id,
      username: newAuthor.username,
      iat: Math.floor(Date.now() / 1000),
    },
    process.env.JWT_SECRET
  );

  res.status(200).json({
    access_token: token,
  });
};
export default Router().use(
  checkRequiredFieldsForSignUp,
  validateSignUpCredentials,
  checkIfCredsAreUsed,
  signup
);
