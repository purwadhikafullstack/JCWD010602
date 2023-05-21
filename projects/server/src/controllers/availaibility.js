const db = require("../models");
const Availaibility = db.availability;
const RoomSpecialPrice = db.roomspecialprice;
const Room = db.room;
const { Op, where } = require("sequelize");
const availControllers = {
  addAvailDate: async (req, res) => {
    try {
      const { startDate, endDate, roomId } = req.body;

      if (roomId == 0 || !startDate || !endDate) {
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
        return res.status(202).json({
          message: "Mohon periksa kembali tanggal yang anda masukkan",
        });
      }
      const addAvailDate = await Availaibility.create({
        ...req.body,
      });

      res.status(200).json({
        message: "Data berhasil ditambahkan",
        result: findSpecialPrice,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getDataAvail: async (req, res) => {
    try {
      const page = req.query.page;
      const limit = 5;
      const startIndex = (page - 1) * limit;
      const lastIndex = page * limit;
      const getDataAvail = await Availaibility.findAll({
        include: {
          model: Room,
        },
      });
      const results = {};
      results.totalData = getDataAvail.length;
      results.pageCount = Math.ceil(getDataAvail.length / limit);

      if (lastIndex < getDataAvail.length) {
        results.next = {
          page: page + 1,
        };
      }

      if (startIndex > 0) {
        results.prev = {
          page: page - 1,
        };
      }

      results.result = getDataAvail.slice(startIndex, lastIndex);
      res.status(200).json({
        result: results,
      });
    } catch (err) {
      console.log(err);
    }
  },
  editAvailDate: async (req, res) => {
    try {
      const { startDate, endDate, roomId } = req.body;
      const id = req.params.id;

      if (roomId == 0 || !startDate || !endDate) {
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
        return res.status(202).json({
          message: "Mohon periksa kembali tanggal yang anda masukkan",
        });
      }

      const editAvail = await Availaibility.update(
        {
          ...req.body,
        },
        { where: { id: id } }
      );

      res.status(200).json({
        message: "Data Berhasil Diubah",
      });
    } catch (err) {
      console.log(err);
    }
  },
  deleteAvail: async (req, res) => {
    try {
      const id = req.params.id;
      await Availaibility.destroy({ where: { id: id } });
      res.status(200).json({
        message: "Data Berhasil Dihapus",
      });
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = availControllers;
