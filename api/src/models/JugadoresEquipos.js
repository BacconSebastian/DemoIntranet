const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "jugadoresequipos",
    {
      ID: {
        type: Sequelize.VIRTUAL,
        get() {
          return (
            String(this.getDataValue("jugadorid")) +
            String(this.getDataValue("equipoid"))
          );
        },
      },
      jugadorid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      equipoid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
