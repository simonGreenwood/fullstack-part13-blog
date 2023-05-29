const express = require("express")
const app = express()
require("express-async-errors")
const { PORT } = require("./utils/config")
const { connectToDatabase } = require("./utils/db")

const blogRouter = require("./controllers/blogs")

app.use(express.json())
const errorHandler = (error, req, res, next) => {
  if (error.name === "TypeError") {
    return res.status(400).send({ error: "Invalid ID" })
  }
  if (error.name === "SequelizeValidationError") {
    return res.status(400).send({ error: "Missing some fields" })
  }
  next(error)
}
app.use("/api/blogs", blogRouter)
app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
  })
}
start()
