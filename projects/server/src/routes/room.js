const express = require("express");
const router = express.Router();
const { fileUploader } = require("../middlewares/multer");
const { roomControllers } = require("../controllers");

router.get("/roombyproperty", roomControllers.getRoomByPropertyID);
router.get("/specialprice", roomControllers.getDataSpecialPrice);
router.get("", roomControllers.getDataRoom);
router.get("/list", roomControllers.getDataSelectRoom);
router.get("/:id", roomControllers.getDataRoombyID);
router.get("/photos/:id", roomControllers.getEditPhotosRoom);
router.post("/photos", roomControllers.getAddPhotosRoom);
router.patch("/editRoom/:id", roomControllers.editRoom);
router.patch("/editSpecialPrice/:id", roomControllers.editSpecialRoom);
router.post("/removePhotobyUrl", roomControllers.deletePhotobyUrl);
router.delete("/removeRoom/:id", roomControllers.deleteRoom);
router.delete("/removeSpecialPrice/:id", roomControllers.deleteSpecialPrice);
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
  "/addRoom",
  fileUploader({
    destinationFolder: "ROOM",
    fileType: "image",
    prefix: "ROOM",
  }).array("files"),
  roomControllers.addRoom
);
router.post("/addSpecialPrice", roomControllers.addSpecialPrice);

module.exports = router;
