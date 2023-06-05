const express = require("express");
const app = express();
require("express-async-errors");
const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const authorRouter = require("./controllers/authors");
const readingListRouter = require("./controllers/readingLists");
const logoutRouter = require("./controllers/logout");

app.use(express.json());
const errorHandler = (error, req, res, next) => {
  console.error(error);
  if (error.name === "SequelizeValidationError") {
    return res
      .status(400)
      .send({ error: error.errors.map((error) => error.message) });
  }
  if (error.name === "SequelizeUniqueConstraintError") {
    return res
      .status(400)
      .send({ error: error.errors.map((error) => error.message) });
  }

  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Invalid token" });
  }

  next(error);
};
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/authors", authorRouter);
app.use("/api/readingLists", readingListRouter);
app.use("/api/logout", logoutRouter);
app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
  });
};
start();
