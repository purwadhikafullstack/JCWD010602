const { where } = require("sequelize");
const db = require("../models");
const Room = db.room;
const RoomSpecialPrice = db.roomspecialprice;
const Picture = db.picture;
const RoomPicture = db.roompicture;
const { sequelize } = require("../models");

const roomControllers = {
  // getAllRoom: async (req, res) => {
  //   try {
  //     const getAllRooms = await RoomPicture.findAll({
  //       attributes: ["id"],
  //       include: [
  //         {
  //           model: Room,
  //         },

  //         {
  //           model: Picture,
  //           attributes: [
  //             [
  //               sequelize.fn("GROUP_CONCAT", sequelize.literal("pictureUrl")),
  //               "LinkImage",
  //             ],
  //           ],
  //         },
  //       ],
  //       group: ["roomId"],
  //     });
  //     res.status(200).json({
  //       result: getAllRooms,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  addRoom: async (req, res) => {
    const t = sequelize.transaction();
    try {
      const {
        productId,
        name,
        price,
        description,
        details,
        roomType,
        startDate,
        endDate,
        specialPrice,
        facility,
      } = req.body;

      const roomIsExist = await Room.findOne({
        where: {
          name: name,
        },
      });

      if (roomIsExist) {
        return res.status(201).json({
          message: "Room ini sudah terdaftar",
        });
      }
      const createRoom = await Room.create({
        productId: productId,
        name: name,
        price: price,
        description: description,
        details: details,
        roomType: roomType,
        facility: facility,
      });

      // const roomPictureData = [];
      // for (let i = 0; i < createPictureUrl.length; i++) {
      //   roomPictureData.push({
      //     roomId: createRoom.dataValues.id,
      //     pictureId: createPictureUrl[i].dataValues.id,
      //   });
      // }
      // console.log(roomPictureData);
      // const createRoomPicture = await RoomPicture.bulkCreate(roomPictureData);

      if (startDate && endDate && specialPrice) {
        const findRoomId = await RoomSpecialPrice.findOne({
          where: {
            roomId: createRoom.dataValues.id,
          },
        });

        if (findRoomId) {
          return res.status(200).json({
            message: "Room ini sudah memiliki special price",
          });
        }
        const createRoomSpecialPrice = await RoomSpecialPrice.create({
          roomId: createRoom.dataValues.id,
          startDate: startDate,
          endDate: endDate,
          specialPrice: specialPrice,
        });
      }
      await t.commit;
      res.status(200).json({
        message: "Data room berhasil ditambahkan",
      });
    } catch (err) {
      await t.rollback();
      console.log(err);
    }
  },
  editRoom: async (req, res) => {
    const t = sequelize.transaction();
    try {
      const { name, price, description, details, facility } = req.body;
      const id = req.params.id;
      const data = { name, price, description, details, facility };

      const updateRoom = await Room.update(
        {
          ...data,
        },
        {
          where: { id: id },
        }
      );
      res.status(200).json({
        result: updateRoom,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getDataRoom: async (req, res) => {
    try {
      const getData = await Room.findAll();
      res.status(200).json({
        result: getData,
      });
    } catch (err) {}
  },
  getDataRoombyID: async (req, res) => {
    try {
      const id = req.params.id;
      const getData = await Room.findByPk(id);
      res.status(200).json({
        result: getData,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getDataSpecialPrice: async (req, res) => {
    try {
      const getData = await RoomSpecialPrice.findAll({
        include: {
          model: Room,
          attributes: ["name", "price"],
        },
      });
      res.status(200).json({
        result: getData,
      });
    } catch (err) {}
  },
  getEditPhotosRoom: async (req, res) => {
    try {
      const id = req.params.id;

      const getPhotos = await RoomPicture.findAll({
        include: [
          {
            model: Picture,
            attributes: ["pictureUrl"],
          },
        ],
        where: {
          roomId: id,
        },
      });

      res.status(200).json({
        result: getPhotos,
      });
    } catch (err) {}
  },
  deleteRoom: async (req, res) => {
    try {
      const id = req.params.id;

      const findSpecialRoom = await RoomSpecialPrice.findOne({
        where: {
          roomId: id,
        },
      });

      if (findSpecialRoom) {
        await RoomSpecialPrice.destroy({
          where: {
            roomId: id,
          },
        });
      }
      await Room.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).json({
        message: "Data berhasil dihapus",
      });
    } catch (err) {
      console.log(err);
    }
  },
  deletePhotoRoom: async (req, res) => {
    try {
      const { roomId, pictureUrl } = req.body;

      const findId = await Picture.findOne({
        where: {
          pictureUrl: pictureUrl,
        },
      });

      if (findId) {
        await RoomPicture.destroy({
          where: [{ roomId: roomId }, { pictureId: findId.dataValues.id }],
        });
      }

      res.status(200).json({
        message: "Data berhasil dihapus",
      });
    } catch (err) {
      console.log(err);
    }
  },
  editPhotosRoom: async (req, res) => {
    try {
      const roomId = req.body.roomId;
      const reqFiles = [];
      const fileKeys = Object.keys(req.files);
      const url = process.env.render_image;
      for (let i = 0; i < fileKeys.length; i++) {
        const dataUrl = { pictureUrl: url + req.files[i].filename };
        reqFiles.push(dataUrl);
      }

      const addPhotos = await Picture.bulkCreate(reqFiles);
      const arrRoomPictures = [];

      for (let i = 0; i < addPhotos.length; i++) {
        arrRoomPictures.push({
          pictureId: addPhotos[i].dataValues.id,
          roomId: roomId,
        });
      }

      const addRoomPicture = await RoomPicture.bulkCreate(arrRoomPictures);
      res.status(200).json({
        result: addPhotos,
      });
      console.log(addRoomPicture);
    } catch (err) {
      console.log(err);
    }
  },
  addPhotosRoom: async (req, res) => {
    try {
      const reqFiles = [];
      const fileKeys = Object.keys(req.files);
      const url = process.env.render_image;
      for (let i = 0; i < fileKeys.length; i++) {
        const dataUrl = { pictureUrl: url + req.files[i].filename };
        reqFiles.push(dataUrl);
      }

      const addPhotos = await Picture.bulkCreate(reqFiles);
      res.status(200).json({
        result: addPhotos,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getAddPhotosRoom: async (req, res) => {
    try {
      const id = req.body.id;
      const fetchPhotos = await Picture.findAll({
        where: { id: id },
      });
      res.status(200).json({
        result: fetchPhotos,
      });
    } catch (err) {}
  },
};

module.exports = roomControllers;
