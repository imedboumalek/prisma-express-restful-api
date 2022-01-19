import express from "express";
const router = express.Router();
import prisma from "../../prisma-client";
import bcrypt from "bcrypt";
import jose from "jose";

const checkRequiredFields = (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({
      message: "Please provide username, email and password",
    });
    return;
  }

  next();
};
// all should be strings

const validateCredentials = async (req, res, next) => {
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
  if (typeof first_name !== "string") {
    response["first_name"] = "First name must be a string";
  }
  if (typeof last_name !== "string") {
    response["last_name"] = "Last name must be a string";
  }

  if (response) {
    res.status(400).json(response);
    return;
  }
  next();
};

const checkCredentialExistance = async (req, res, next) => {
  const { username, email } = req.body;
  const usedCredentials =
    (await prisma.author.count({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    })) !== 0;
  console.log("usedCredentials", usedCredentials);
  if (usedCredentials) {
    res.status(400).json({
      message: "Username or email already exists",
    });
    return;
  }
  next();
};
const signup = async (req, res) => {
  const { username, email, password, first_name, last_name } = req.body;
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
        jwt: "zaa3ma jwt ak chayef",
      },
    })
    .then((author) => {
      const { salt, password, jwt, ...therest } = author;
      return therest;
    });
  res.status(200).json({
    ...newAuthor,
  });
};

router.post(
  "/signup",
  checkRequiredFields,
  checkCredentialExistance,
  validateCredentials,
  signup
);
router.all("/signup", (req, res) => {
  // return method not allowed
  res.status(405).send({
    message: "Method not allowed",
  });
});

export default router;
