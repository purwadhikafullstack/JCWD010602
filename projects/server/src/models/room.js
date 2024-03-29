"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Room.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.STRING,
      facility: DataTypes.STRING,
      details: DataTypes.STRING,
      roomType: DataTypes.STRING,
      productId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Room",
    }
  );
  return Room;
};
