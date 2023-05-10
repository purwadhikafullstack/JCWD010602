const authControllers = require("./auth");
const propertyControllers = require("./property");
const roomControllers = require("./room");
const availControllers = require("./availaibility");
const transactionsControllers = require("./transactions");
module.exports = {
  authControllers,
  propertyControllers,
  roomControllers,
  availControllers,
  transactionsControllers,
};
