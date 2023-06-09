const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Session } = require("../models");
const { SECRET } = require("../utils/config");

router.post("/", async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });

  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(req.body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };
  const token = jwt.sign(userForToken, SECRET);
  const session = await Session.create({ token });
  console.log(session.token);
  res.status(200).send({ token, username: user.username, name: user.name });
});
module.exports = router;
