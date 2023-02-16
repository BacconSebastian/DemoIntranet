const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "entrenadores",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      uid: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
