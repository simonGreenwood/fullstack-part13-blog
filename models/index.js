const Blog = require("./blog");
const User = require("./user");
const Session = require("./session");
const ReadingListItem = require("./reading_list_item");
User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingListItem, as: "readingList" });
Blog.belongsToMany(User, { through: ReadingListItem, as: "readingList" });
User.hasMany(ReadingListItem);
ReadingListItem.belongsTo(User);
Blog.hasMany(ReadingListItem);
ReadingListItem.belongsTo(Blog);

module.exports = { Blog, User, Session, ReadingListItem };
