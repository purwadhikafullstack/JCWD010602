const express = require("express");
const router = express.Router();
const { fileUploader } = require("../middlewares/multer");
const { roomControllers } = require("../controllers");

router.get("/", roomControllers.getDataRoom);
router.get("/:id", roomControllers.getDataRoombyID);
router.get("/specialprice", roomControllers.getDataSpecialPrice);
router.get("/photos/:id", roomControllers.getEditPhotosRoom);
router.post("/photos", roomControllers.getAddPhotosRoom);
router.patch("/editRoom/:id", roomControllers.editRoom);
router.post(
  "/removePhotos",
  fileUploader({
    destinationFolder: "ROOM",
    fileType: "image",
    prefix: "ROOM",
  }).array("files"),
  roomControllers.deletePhotoRoom
);
router.post(
  "/editPhotos",
  fileUploader({
    destinationFolder: "ROOM",
    fileType: "image",
    prefix: "ROOM",
  }).array("files"),
  roomControllers.editPhotosRoom
);
router.post(
  "/addPhotos",
  fileUploader({
    destinationFolder: "ROOM",
    fileType: "image",
    prefix: "ROOM",
  }).array("files"),
  roomControllers.addPhotosRoom
);

router.delete("/removeRoom/:id", roomControllers.deleteRoom);
router.post(
  "/addRoom",
  fileUploader({
    destinationFolder: "ROOM",
    fileType: "image",
    prefix: "ROOM",
  }).array("files"),
  roomControllers.addRoom
);

module.exports = router;
