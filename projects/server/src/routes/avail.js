const express = require("express");
const router = express.Router();
const { availControllers } = require("../controllers");

router.get("", availControllers.getDataAvail);
router.patch("/editAvail/:id", availControllers.editAvailDate);
router.delete("/deleteAvail/:id", availControllers.deleteAvail);
router.post("/addAvail", availControllers.addAvailDate);

module.exports = router;
