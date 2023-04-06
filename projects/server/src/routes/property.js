const express = require("express");
const router = express.Router();

const { propertyControllers } = require("../controllers");

router.get("/:id", propertyControllers.getPropertybyId);
router.get("/", propertyControllers.getProperty);

module.exports = router;
