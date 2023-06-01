const router = require("express").Router()
const jwt = require("jsonwebtoken")
const { Blog, User } = require("../models")
const { SECRET } = require("../utils/config")
const { sequelize } = require("../utils/db")

router.get("/", async (req, res) => {
  const users = await Blog.findAll({
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("author")), "articles"],
    ],
    group: "author",
  })
  res.json(users)
})

module.exports = router
