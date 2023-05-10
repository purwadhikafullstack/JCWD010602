const { sequelize } = require("../models");
const db = require("../models");
const Property = db.product;
const Productpictures = db.productpicture;
const Pictures = db.picture;
const { Op, QueryTypes } = require("sequelize");

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
  getAllProperty: async (req, res) => {
    try {
      const page = req.query.page;
      const limit = 2;
      const startIndex = (page - 1) * limit;
      const lastIndex = page * limit;
      const getData = await sequelize.query(
        `select p.id, p.name,p.description,p.facility,c.location,pic.pictureUrl,pp.productId,count(r.productId) as total_reviews from 
      products p 
      join categories c on p.categoryId = c.id
      join (select * from productpictures group by productpictures.productId) pp on p.id = pp.productId 
      join pictures pic on pic.id = pp.pictureId
      join reviews r on r.productId = p.id 
      group by p.id`,
        { type: QueryTypes.SELECT }
      );

      const results = {};

      results.totalData = getData.length;
      results.pageCount = Math.ceil(getData.length / limit);
      if (lastIndex > getData.length) {
        results.next = { page: page + 1 };
      }

      if (startIndex > 0) {
        results.prev = { page: page - 1 };
      }

      results.result = getData.slice(startIndex, lastIndex);
      res.status(200).json({
        result: results,
      });
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = propertyControllers;
