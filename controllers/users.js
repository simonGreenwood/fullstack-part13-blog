const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User, Blog, ReadingListItem } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: { model: Blog, attributes: { exclude: ["userId"] } },
  });
  res.json(users);
});

const passwordHasher = async (req, res, next) => {
  const passwordHash = await bcrypt.hash(req.body.password, 10);
  req.body.passwordHash = passwordHash;
  next();
};

router.post("/", passwordHasher, async (req, res) => {
  const newUser = await User.create(req.body);
  if (!newUser) {
  }
  res.json(newUser);
});

const userExtractor = async (req, res, next) => {
  const user = await User.findOne({ where: { username: req.params.username } });
  if (!user) {
    return res.status(404).json({ error: "Invalid username" });
  }
  req.user = user;
  next();
};

router.put("/:username", userExtractor, async (req, res) => {
  req.user.username = req.body.username;
  await req.user.save();
  res.json(req.user);
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: [],
    include: [
      {
        model: Blog,
        as: "readingList",
        attributes: { exclude: ["userId"] },
        through: {
          attributes: ["read", "id"],
          as: "readingLists",
        },
      },
    ],
  });
  res.json(user);
});
module.exports = router;
