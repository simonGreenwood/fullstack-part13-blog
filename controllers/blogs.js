const router = require("express").Router()
const jwt = require("jsonwebtoken")
const { Blog, User } = require("../models")
const { SECRET } = require("../utils/config")

const tokenParser = async (req, res, next) => {
  const token = req.headers.authorization.substring(7)
  const decodedToken = jwt.verify(token, SECRET)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "Token missing or invalid" })
  }
  req.user = await User.findByPk(decodedToken.id)
  next()
}

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll()
  console.log(blogs.map((blog) => blog.toJSON()))
  res.json(blogs)
})

router.post("/", tokenParser, async (req, res) => {
  req.body.userId = req.user.id
  const newBlog = await Blog.create(req.body)
  res.json(newBlog)
})

const blogFinder = async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id)
  if (!blog) {
    return res.status(404).json({ error: "Invalid ID" })
  }
  req.blog = blog
  next()
}

router.delete("/:id", blogFinder, tokenParser, async (req, res) => {
  console.log(req.headers.authorization)
  if (req.blog.userId !== req.user.id) {
    return res.status(401).json({ error: "Unauthorized" })
  }
  await req.blog.destroy()
  res.status(204).end()
})

router.put("/:id", blogFinder, async (req, res) => {
  if (req.body.likes === undefined) {
    return res.status(400).send({ error: "Amount of likes missing" })
  }
  req.blog.likes = req.body.likes
  req.blog.save()
  res.json({ likes: req.blog.likes })
})
module.exports = router
