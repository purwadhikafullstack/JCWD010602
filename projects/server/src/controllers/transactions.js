const db = require("../models");
const { sequelize } = require("../models");
const Transactions = db.transaction;
const Room = db.room;
const User = db.user;
const Property = db.product;
const Tenant = db.tenant;
const { Op, QueryTypes } = require("sequelize");
const transactionsControllers = {
  getTransMenungguPembayaran: async (req, res) => {
    try {
      const page = parseInt(req.query.page);
      const limit = 5;
      const startDIndex = (page - 1) * limit;
      const lastIndex = page * limit;

      const getData = await Transactions.findAll({
        include: [
          {
            model: User,
          },
          {
            model: Room,
            include: {
              model: Property,
              // where: { tenantId: 1 },
            },
          },
        ],
        where: {
          status: "MENUNGGU PEMBAYARAN",
        },
      });

      const results = {};
      results.totalData = getData.length;
      results.pageCount = Math.ceil(getData.length / limit);
      if (lastIndex > getData.length) {
        results.next = {
          page: page + 1,
        };
      }

      if (startDIndex > 0) {
        results.prev = {
          page: page - 1,
        };
      }

      results.result = getData.slice(startDIndex, lastIndex);

      res.status(200).json({
        result: results,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getTransDibatalkan: async (req, res) => {
    try {
      const page = parseInt(req.query.page);
      const limit = 5;
      const startDIndex = (page - 1) * limit;
      const lastIndex = page * limit;

      const getData = await Transactions.findAll({
        include: [
          {
            model: User,
          },
          {
            model: Room,
            include: [
              {
                model: Property,
                where: { tenantId: 1 },
              },
            ],
          },
        ],
        where: {
          status: "DIBATALKAN",
        },
      });

      const results = {};
      results.totalData = getData.length;
      results.pageCount = Math.ceil(getData.length / limit);
      if (lastIndex > getData.length) {
        results.next = {
          page: page + 1,
        };
      }

      if (startDIndex > 0) {
        results.prev = {
          page: page - 1,
        };
      }

      results.result = getData.slice(startDIndex, lastIndex);

      res.status(200).json({
        result: results,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getTransMenungguKonfirmasiPembayaran: async (req, res) => {
    try {
      const page = parseInt(req.query.page);
      const limit = 5;
      const startDIndex = (page - 1) * limit;
      const lastIndex = page * limit;

      const getData = await Transactions.findAll({
        include: [
          {
            model: User,
          },
          {
            model: Room,
            include: [
              {
                model: Property,
                where: { tenantId: 1 },
              },
            ],
          },
        ],
        where: {
          status: "MENUNGGU KONFIRMASI PEMBAYARAN",
        },
      });

      const results = {};
      results.totalData = getData.length;
      results.pageCount = Math.ceil(getData.length / limit);
      if (lastIndex > getData.length) {
        results.next = {
          page: page + 1,
        };
      }

      if (startDIndex > 0) {
        results.prev = {
          page: page - 1,
        };
      }

      results.result = getData.slice(startDIndex, lastIndex);

      res.status(200).json({
        result: results,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getTransPembayaranBerhasil: async (req, res) => {
    try {
      const page = parseInt(req.query.page);
      const limit = 5;
      const startDIndex = (page - 1) * limit;
      const lastIndex = page * limit;

      const getData = await Transactions.findAll({
        include: [
          {
            model: User,
          },
          {
            model: Room,
            include: [
              {
                model: Property,
                where: { tenantId: 1 },
              },
            ],
          },
        ],
        where: {
          status: "PEMBAYARAN BERHASIL",
        },
      });

      const results = {};
      results.totalData = getData.length;
      results.pageCount = Math.ceil(getData.length / limit);
      if (lastIndex > getData.length) {
        results.next = {
          page: page + 1,
        };
      }

      if (startDIndex > 0) {
        results.prev = {
          page: page - 1,
        };
      }

      results.result = getData.slice(startDIndex, lastIndex);

      res.status(200).json({
        result: results,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getTransBerhasil: async (req, res) => {
    try {
      const page = parseInt(req.query.page);
      const limit = 5;
      const startDIndex = (page - 1) * limit;
      const lastIndex = page * limit;

      const getData = await Transactions.findAll({
        include: [
          {
            model: User,
          },
          {
            model: Room,
            include: [
              {
                model: Property,
                where: { tenantId: 1 },
              },
            ],
          },
        ],
        where: {
          status: "BERHASIL",
        },
      });

      const results = {};
      results.totalData = getData.length;
      results.pageCount = Math.ceil(getData.length / limit);
      if (lastIndex > getData.length) {
        results.next = {
          page: page + 1,
        };
      }

      if (startDIndex > 0) {
        results.prev = {
          page: page - 1,
        };
      }

      results.result = getData.slice(startDIndex, lastIndex);

      res.status(200).json({
        result: results,
      });
    } catch (err) {
      console.log(err);
    }
  },
  cancelTrans: async (req, res) => {
    try {
      const id = req.body.id;

      const cancelTrans = await Transactions.update(
        { status: "DIBATALKAN" },
        { where: { id: id } }
      );

      res.status(200).json({
        message: "Transaksi Dibatalkan",
      });
    } catch (err) {
      console.log(err);
    }
  },
  rejectTrans: async (req, res) => {
    try {
      const id = req.body.id;

      await Transactions.update(
        { status: "MENUNGGU PEMBAYARAN" },
        { where: { id: id } }
      );

      await Transactions.update({ paymentSlip: "" }, { where: { id: id } });

      await Transactions.update(
        { paymentStatus: false },
        { where: { id: id } }
      );

      res.status(200).json({
        message: "Transaksi Ditolak",
      });
    } catch (err) {
      console.log(err);
    }
  },
  approvedTrans: async (req, res) => {
    try {
      const id = req.body.id;

      await Transactions.update(
        { status: "PEMBAYARAN BERHASIL" },
        { where: { id: id } }
      );

      await Transactions.update({ paymentStatus: true }, { where: { id: id } });

      res.status(200).json({
        message: "Transaksi Telah Dikonfirmasi",
      });
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = transactionsControllers;
