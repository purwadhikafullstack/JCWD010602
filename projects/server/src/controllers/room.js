const { Op, QueryTypes } = require("sequelize");
const fs = require("fs");
const db = require("../models");
const Room = db.room;
const Property = db.product;
const RoomSpecialPrice = db.roomspecialprice;
const Picture = db.picture;
const RoomPicture = db.roompicture;
const Availaibility = db.availability;
const { sequelize } = require("../models");

const roomControllers = {
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
        facility,
      } = req.body;

      console.log(price);
      if (productId == 0 || price == 0 || req.files.length == 0) {
        return res.status(202).json({
          message: "Pastikan data yang anda masukkan lengkap",
        });
      }

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

      const reqFiles = [];
      const fileKeys = Object.keys(req.files);
      const url = process.env.render_image;
      for (let i = 0; i < fileKeys.length; i++) {
        const dataUrl = { pictureUrl: url + req.files[i].filename };
        reqFiles.push(dataUrl);
      }

      const createPictureUrl = await Picture.bulkCreate(reqFiles);

      const roomPictureData = [];
      for (let i = 0; i < createPictureUrl.length; i++) {
        roomPictureData.push({
          roomId: createRoom.dataValues.id,
          pictureId: createPictureUrl[i].dataValues.id,
        });
      }
      console.log(roomPictureData);
      const createRoomPicture = await RoomPicture.bulkCreate(roomPictureData);

      await t.commit;
      res.status(200).json({
        message: "Data room berhasil ditambahkan",
      });
    } catch (err) {
      await t.rollback;
      console.log(err);
    }
  },
  addSpecialPrice: async (req, res) => {
    try {
      const { roomId, startDate, endDate, specialPrice } = req.body;

      if (roomId == 0 || !startDate || !endDate || specialPrice == 0) {
        return res.status(202).json({
          message: "Pastikan data yang anda masukkan lengkap",
        });
      }

      const findSpecialPrice = await RoomSpecialPrice.findAll({
        where: {
          [Op.or]: [
            { startDate: { [Op.between]: [startDate, endDate] } },
            { endDate: { [Op.between]: [startDate, endDate] } },
          ],
        },
      });

      const findAvailDate = await Availaibility.findAll({
        where: {
          [Op.and]: [
            { roomId: roomId },
            {
              [Op.or]: [
                { startDate: { [Op.between]: [startDate, endDate] } },
                { endDate: { [Op.between]: [startDate, endDate] } },
              ],
            },
          ],
        },
      });

      if (findSpecialPrice.length > 0 || findAvailDate.length > 0) {
        return res.status(201).json({
          message: "Tanggal ini tidak dapat digunakan",
        });
      }

      if (startDate > endDate) {
        return res.status(201).json({
          message: "Mohon periksa tanggal yang dimasukkan",
        });
      }

      const createSpecialPrice = await RoomSpecialPrice.create({
        ...req.body,
      });

      res.status(200).json({
        message: "Data berhasil ditambahkan",
        result: createSpecialPrice,
      });
    } catch (err) {
      console.log(err);
    }
  },
  editRoom: async (req, res) => {
    const t = sequelize.transaction();
    try {
      const { name, price, description, details, facility } = req.body;
      const id = req.params.id;
      const data = { name, price, description, details, facility };

      if (!data) {
        return res.status(201).json({
          message: "Pastikan data yang anda masukkan lengkap",
        });
      }

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
        message: "Data Berhasil Diubah",
      });
    } catch (err) {
      console.log(err);
    }
  },
  editSpecialRoom: async (req, res) => {
    try {
      const id = req.params.id;
      const { roomId, startDate, endDate, specialPrice } = req.body;
      const updateSpecialRoom = await RoomSpecialPrice.update(
        {
          ...req.body,
        },
        {
          where: { id: id },
        }
      );
      res.status(200).json({
        message: "Data berhasil di ubah",
        result: updateSpecialRoom,
      });
    } catch (err) {}
  },
  getDataRoom: async (req, res) => {
    try {
      const page = parseInt(req.query.page);
      const limit = 2;
      const startIndex = (page - 1) * limit;
      const lastIndex = page * limit;

      const getData = await Room.findAll({
        include: {
          model: Property,
          attributes: ["id", "name"],
        },
      });

      const results = {};
      results.totalData = getData.length;
      results.pageCount = Math.ceil(getData.length / limit);

      if (lastIndex < getData.length) {
        results.next = {
          page: page + 1,
        };
      }

      if (startIndex > 0) {
        results.prev = {
          page: page - 1,
        };
      }

      results.result = getData.slice(startIndex, lastIndex);
      res.status(200).json({
        result: results,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getDataSelectRoom: async (req, res) => {
    try {
      const getListData = await Room.findAll();
      res.status(200).json({
        result: getListData,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getDataRoombyID: async (req, res) => {
    try {
      const id = req.params.id;
      console.log(req.params.id);
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
      const page = req.query.page;
      const limit = 3;
      const startIndex = (page - 1) * limit;
      const lastIndex = page * limit;
      const getData = await RoomSpecialPrice.findAll({
        include: {
          model: Room,
          include: {
            model: Property,
          },
        },
      });

      const results = {};
      results.totalData = getData.length;
      results.pageCount = Math.ceil(getData.length / limit);

      if (lastIndex < getData.length) {
        results.next = {
          page: page + 1,
        };
      }

      if (startIndex > 0) {
        results.prev = {
          page: page - 1,
        };
      }

      results.result = getData.slice(startIndex, lastIndex);
      res.status(200).json({
        result: results,
      });
    } catch (err) {
      console.log(err);
    }
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
        const urlPictureOld = pictureUrl.split("/");
        const urlPictureNew = urlPictureOld[4];
        const filepath = `${__dirname}/../public/ROOM/${urlPictureNew}`;
        fs.unlinkSync(filepath);
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
  deletePhotobyUrl: async (req, res) => {
    try {
      const pictureUrl = req.body.pictureUrl;
      const deletePhoto = await Picture.destroy({
        where: {
          pictureUrl: pictureUrl,
        },
      });

      res.status(200).json({
        message: "Data berhasil dihapus",
      });
    } catch (err) {
      console.log(err);
    }
  },
  deleteSpecialPrice: async (req, res) => {
    try {
      const id = req.params.id;
      await RoomSpecialPrice.destroy({
        where: { id: id },
      });

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

      if (req.files === undefined) {
        return res.status(201).json({
          message: "Masukkan minimal 1 foto",
        });
      }
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
  getRoomByPropertyID: async (req, res) => {
    try {
      const productId = req.query.productId;
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      console.log(limit);
      const startIndex = (page - 1) * limit;
      const lastIndex = page * limit;
      const getData = await Room.findAll({
        where: {
          productId: productId,
        },
      });

      const results = {};

      results.totalData = getData.length;
      results.pageCount = Math.ceil(getData.length / limit);

      if (lastIndex < getData.length) {
        results.next = {
          page: page + 1,
        };
      }

      if (startIndex > 0) {
        results.prev = {
          page: page - 1,
        };
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

module.exports = roomControllers;
