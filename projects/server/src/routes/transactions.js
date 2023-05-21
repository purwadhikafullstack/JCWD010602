const express = require("express");
const router = express.Router();

const { transactionsControllers } = require("../controllers");

router.post(
  "/menunggupembayaran",
  transactionsControllers.getTransMenungguPembayaran
);
router.post("/dibatalkan", transactionsControllers.getTransDibatalkan);
router.post(
  "/menunggukonfirmasipembayaran",
  transactionsControllers.getTransMenungguKonfirmasiPembayaran
);
router.post(
  "/pembayaranberhasil",
  transactionsControllers.getTransPembayaranBerhasil
);
router.post("/berhasil", transactionsControllers.getTransBerhasil);
router.post("/cancelTrans", transactionsControllers.cancelTrans);
router.post("/rejectTrans", transactionsControllers.rejectTrans);
router.post("/approvedTrans", transactionsControllers.approvedTrans);

module.exports = router;
