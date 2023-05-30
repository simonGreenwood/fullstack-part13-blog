const router = require("express").Router()
const { User, Blog } = require("../models")

router.get("/", async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})
router.post("/", async (req, res) => {
  const newUser = await User.create(req.body)
  res.json(newUser)
})

module.exports = router
