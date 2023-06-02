const Blog = require("./blog");
const User = require("./user");
const ReadingListItem = require("./reading_list_item");
User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingListItem, as: "readingList" });
Blog.belongsToMany(User, { through: ReadingListItem, as: "readingList" });
module.exports = { Blog, User, ReadingListItem };
