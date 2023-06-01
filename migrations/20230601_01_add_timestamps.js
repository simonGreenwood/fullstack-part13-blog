const { DataTypes } = require("sequelize")
module.exports = {
  up: async ({ context: queryInterface }) => {
    // add the columns for the blogs

    await queryInterface.addColumn("blogs", "created_at", {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    })
    await queryInterface.addColumn("blogs", "updated_at", {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    })

    // add the columns for the users

    await queryInterface.addColumn("users", "created_at", {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    })
    await queryInterface.addColumn("users", "updatedAt", {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    })
  },
  down: async ({ context: queryInterface }) => {
    // remove the columns for the blogs

    await queryInterface.removeColumn("blogs", "created_at")
    await queryInterface.removeColumn("blogs", "updated_at")

    // remove the columns for the users

    await queryInterface.removeColumn("users", "created_at")
    await queryInterface.removeColumn("users", "updated_at")
  },
}
