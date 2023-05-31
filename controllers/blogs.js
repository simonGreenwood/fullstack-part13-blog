const router = require("express").Router()
const jwt = require("jsonwebtoken")
const { Blog, User } = require("../models")
const { SECRET } = require("../utils/config")
const { Op } = require("sequelize")

const tokenExtractor = (req, res, next) => {
  const authorization = req.headers.authorization
  console.log(req.get("authorization"), req.params.authorization)
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      const decodedToken = jwt.verify(authorization.substring(7), SECRET)
      req.user = User.findByPk(decodedToken.id)
    } catch {
      return res.status(401).json({ error: "token invalid" })
    }
  } else {
    return res.status(401).json({ error: "token missing" })
  }
  next()
}

router.get("/", async (req, res) => {
  const where = {}
  if (req.query.search) {
    where.title = {
      [Op.substring]: req.query.search,
    }
  }
  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: { model: User, attributes: ["username", "name"] },
    where,
  })
  res.json(blogs)
})

router.post("/", tokenExtractor, async (req, res) => {
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

router.delete("/:id", blogFinder, tokenExtractor, async (req, res) => {
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
