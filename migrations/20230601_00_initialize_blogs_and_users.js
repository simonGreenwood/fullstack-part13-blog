const { DataTypes } = require("sequelize");
module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable(
      "blogs",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        author: {
          type: DataTypes.TEXT,
        },
        url: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        title: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        likes: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
      },
      {
        timestamps: true,
      }
    );
    await queryInterface.createTable(
      "users",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.TEXT,
          unique: true,
          allowNull: false,
          validate: {
            isEmail: true,
          },
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        timestamps: true,
      }
    );

    await queryInterface.addColumn("blogs", "user_id", {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    });
    await queryInterface.addColumn("users", "password_hash", {
      type: DataTypes.TEXT,
      allowNull: false,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("notes");
    await queryInterface.dropTable("users");
  },
};
