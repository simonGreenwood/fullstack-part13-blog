const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class ReadingListItem extends Model {}
ReadingListItem.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "users", key: "id" },
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "users", key: "id" },
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
module.exports = { ReadingListItem };
