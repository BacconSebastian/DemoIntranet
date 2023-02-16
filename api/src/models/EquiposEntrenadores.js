const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "equiposentrenadores",
    {
      ID: {
        type: Sequelize.VIRTUAL,
        get() {
          return (
            String(this.getDataValue("equipoid")) +
            String(this.getDataValue("entrenadorid"))
          );
        },
      },
      equipoid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      entrenadorid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
