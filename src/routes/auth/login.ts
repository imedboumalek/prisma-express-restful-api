import express from "express";
import dbclient from "../../prisma-client";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
const router = express.Router();
const checkRequiredFields = (req, res, next) => {
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
//TODO refactor this
router.post("/login", checkRequiredFields, async (req, res) => {
  const { username, password } = req.body;

  const user = await dbclient.author.findFirst({
    where: {
      username: username,
    },
  });
  console.log("user", user);

  if (!user) {
    res.status(400).json({
      message: "Username or password is incorrect",
    });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, user.salt);
  const isPasswordValid = hashedPassword === user.password;
  console.log("isPasswordValid", isPasswordValid);

  if (!isPasswordValid) {
    res.status(400).json({
      message: "Username or password is incorrect",
    });
    return;
  }
  const token = jsonwebtoken.sign(
    {
      sub: user.id,
      username: user.username,
      iat: Math.floor(Date.now() / 1000),
    },
    process.env.JWT_SECRET
  );
  await dbclient.author
    .update({
      where: {
        id: user.id,
      },
      data: {
        jwt: token,
      },
    })

    .then(() => {
      console.log("updated jwt");
    });

  res.status(200).json({
    access_token: token,
  });
});

router.all("/login", (req, res) => {
  // return method not allowed
  res.status(405).send({
    message: "Method not allowed",
  });
});
export default router;
