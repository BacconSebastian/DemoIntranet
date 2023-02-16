const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "equipos",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      ciudad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
