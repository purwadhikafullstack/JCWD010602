'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    fullname: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
    gender: DataTypes.STRING,
    birtdate: {type:DataTypes.DATE,allowNull:true},
    profilePicture: DataTypes.STRING,
    isTenant: DataTypes.BOOLEAN,
    suspend:{type:DataTypes.DATE}
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};