const router = require("express").Router()
const bcrypt = require("bcrypt")
const { User } = require("../models")

router.get("/", async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

const passwordHasher = async (req, res, next) => {
  const passwordHash = await bcrypt.hash(req.body.password, 10)
  req.body.passwordHash = passwordHash
  next()
}

router.post("/", passwordHasher, async (req, res) => {
  const newUser = await User.create(req.body)
  res.json(newUser)
})

router.put("/:username", async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } })
  user.username = req.body.username
  await user.save()
  res.json(user)
})
module.exports = router
