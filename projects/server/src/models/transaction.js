'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init({
    paymentStatus: DataTypes.BOOLEAN,
    paymentSlip: DataTypes.STRING,
    checkInDate: DataTypes.DATE,
    checkOutDate: DataTypes.DATE,
    duration:DataTypes.INTEGER,
    totalPrice:DataTypes.INTEGER,
    invoiceNo: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    userId:{type:DataTypes.INTEGER,allowNull:false},
    roomId:{type:DataTypes.INTEGER,allowNull:false},
    avalabilityId:{type:DataTypes.INTEGER,allowNull:false},
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};