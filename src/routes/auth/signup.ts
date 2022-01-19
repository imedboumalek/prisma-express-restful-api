import express from "express";
const router = express.Router();

router.post("/signup", (req, res) => {
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

router.all("/signup", (req, res) => {
  // return method not allowed
  res.status(405).send({
    message: "Method not allowed",
  });
});
export default router;
