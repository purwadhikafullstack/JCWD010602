const { sequelize } = require("../models");
const db = require("../models");
const Property = db.product;

const propertyControllers = {
  getProperty: async (req, res) => {
    try {
      const getProperty = await Property.findAll();
      res.status(200).json({
        message: "Succesfull Fetch Property",
        result: getProperty,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getPropertybyId: async (req, res) => {
    try {
      const id = req.params.id;

      const findbyId = await Property.findByPk(id);
      res.status(200).json({
        result: findbyId,
      });
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = propertyControllers;
