import express from "express";
const router = express.Router();

router.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
      message: "Please provide username and password",
    });
    return;
  }
  res.status(200).json({
    username,
    password,
  });
});

router.all("/auth/login", (req, res) => {
  // return method not allowed
  res.status(405).send({
    message: "Method not allowed",
  });
});
export default router;
