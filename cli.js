const express = require("express")
const app = express()
require("express-async-errors")
const { PORT } = require("./utils/config")
const { connectToDatabase } = require("./utils/db")

const blogRouter = require("./controllers/blogs")
const userRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
app.use(express.json())
const errorHandler = (error, req, res, next) => {
  if (error.name === "SequelizeValidationError") {
    return res
      .status(400)
      .send({ error: error.errors.map((error) => error.message) })
  }
  if (error.name === "SequelizeUniqueConstraintError") {
    return res
      .status(400)
      .send({ error: error.errors.map((error) => error.message) })
  }
  next()
}
app.use("/api/blogs", blogRouter)
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)
app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
  })
}
start()
