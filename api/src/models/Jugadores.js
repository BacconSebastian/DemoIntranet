const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "jugadores",
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
      categoria: {
        type: DataTypes.SMALLINT,
        allowNull: true,
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
