const { DataTypes } = require("sequelize");
const { down } = require("./20230604_00_add_user_disable");
module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("sessions", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("sessions");
  },
};
