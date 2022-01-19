import express from "express";
const router = express.Router();
import prisma from "../../prisma-client";
router.post("/signup", async (req, res) => {
  const { username, email } = req.body;
  console.log(username, email);

  if (username && email) {
    const usedCredentials = await prisma.author.count({
      where: {
        OR: [username, email],
      },
    });
    console.log("usedCredentials", usedCredentials);

    if (usedCredentials) {
      res.status(400).json({
        message: "Username or email already exists",
      });
      return;
    }
    res.sendStatus(200).json({
      message: "congratulations, you have signed up",
    });
  } else {
    res.status(400).json({
      message: "Please provide username and email",
    });
  }
});
router.all("/signup", (req, res) => {
  // return method not allowed
  res.status(405).send({
    message: "Method not allowed",
  });
});
export default router;
