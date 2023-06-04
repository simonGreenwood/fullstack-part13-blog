const { SECRET } = require("./config");
const jwt = require("jsonwebtoken");
const { User, Blog, Session } = require("../models");
const tokenExtractor = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      const decodedToken = jwt.verify(authorization.substring(7), SECRET);
      const user = await User.findByPk(decodedToken.id);
      const session = await Session.findAll({
        where: { token: authorization.substring(7) },
      });
      if (session.length === 0 || user.disabled) {
        return res.status(401).json({ error: "token invalid" });
      }

      req.user = user;
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

const blogFinder = async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id);
  if (!blog) {
    return res.status(404).json({ error: "Invalid ID" });
  }
  req.blog = blog;
  next();
};
module.exports = { tokenExtractor, blogFinder };
