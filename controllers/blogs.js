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

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.delete("/:id", blogFinder, async (req, res) => {
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
