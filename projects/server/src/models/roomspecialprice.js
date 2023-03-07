'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoomSpecialPrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RoomSpecialPrice.init({
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    specialPrice: DataTypes.INTEGER,
    roomId:{type:DataTypes.INTEGER,allowNull:false}
  }, {
    sequelize,
    modelName: 'RoomSpecialPrice',
  });
  return RoomSpecialPrice;
};