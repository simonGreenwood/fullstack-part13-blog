const router = require("express").Router()
const jwt = require("jsonwebtoken")
const { Blog, User } = require("../models")
const { SECRET } = require("../utils/config")

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    group: "author",
  })
  res.json(blogs)
})

module.exports = router
