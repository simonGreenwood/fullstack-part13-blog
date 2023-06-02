const Blog = require("./blog");
const User = require("./user");
const ReadingListItem = require("./reading_list_item");
User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingListItem, as: "reading_lists" });
Blog.belongsToMany(User, { through: ReadingListItem, as: "reading_lists" });
module.exports = { Blog, User, ReadingListItem };
