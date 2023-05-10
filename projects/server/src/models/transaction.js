"use strict";
const { Model } = require("sequelize");
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
  Transaction.init(
    {
      paymentStatus: DataTypes.BOOLEAN,
      paymentSlip: DataTypes.STRING,
      checkInDate: DataTypes.DATEONLY,
      checkOutDate: DataTypes.DATEONLY,
      duration: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
      invoiceNo: DataTypes.INTEGER,
      status: DataTypes.STRING,
      userId: { type: DataTypes.INTEGER, allowNull: false },
      roomId: { type: DataTypes.INTEGER, allowNull: false },
      availabilityId: { type: DataTypes.INTEGER, allowNull: false },
      createdAt: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
