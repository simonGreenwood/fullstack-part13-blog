const express = require("express")
const app = express()

const { PORT } = require("./utils/config")
const { connectToDatabase } = require("./utils/db")

const blogRouter = require("./controllers/blogs")

app.use(express.json())

app.use("/api/blogs", blogRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
  })
}
start()
