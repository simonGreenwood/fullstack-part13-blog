require("dotenv").config()
const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = new Sequelize(process.env.DATABASE_URL)

const express = require("express")
const app = express()
app.use(express.json())
class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog",
  }
)

app.get("/api/blogs/", async (req, res) => {
  const blogs = await Blog.findAll()
  console.log(blogs.map((blog) => blog.toJSON()))
  res.json(blogs)
})

app.post("/api/blogs/", async (req, res) => {
  const newBlog = await Blog.create(req.body)
  res.json(newBlog)
})

app.delete("/api/blogs/:id", async (req, res) => {
  const blogToDelete = await Blog.findByPk(req.params.id)
  if (blogToDelete === null) {
    return res.status(400).json({ error: "Invalid ID" })
  }
  await blogToDelete.destroy()
  res.status(204).end()
})
const PORT = 3003
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
})
