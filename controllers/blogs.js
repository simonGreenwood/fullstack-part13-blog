const router = require("express").Router()
const { Blog } = require("../models")

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll()
  console.log(blogs.map((blog) => blog.toJSON()))
  res.json(blogs)
})

router.post("/", async (req, res) => {
  const newBlog = await Blog.create(req.body)
  res.json(newBlog)
})

const blogFinder = async (req, res) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.delete("/:id", blogFinder, async (req, res) => {
  req.blog = await Blog.findByPk(req.params.id)
  await req.blog.destroy()
  res.status(204).end()
})

router.put("/:id", async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  req.blog.likes = req.body.likes
  req.blog.save()
  res.json({ likes: req.blog.likes })
})
module.exports = router
