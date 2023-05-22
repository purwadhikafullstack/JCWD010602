const express = require("express");
const router = express.Router();

const { transactionsControllers } = require("../controllers");

router.get(
  "/menunggupembayaran",
  transactionsControllers.getTransMenungguPembayaran
);
router.get("/dibatalkan", transactionsControllers.getTransDibatalkan);
router.get(
  "/menunggukonfirmasipembayaran",
  transactionsControllers.getTransMenungguKonfirmasiPembayaran
);
router.get(
  "/pembayaranberhasil",
  transactionsControllers.getTransPembayaranBerhasil
);
router.get("/berhasil", transactionsControllers.getTransBerhasil);
router.post("/cancelTrans", transactionsControllers.cancelTrans);
router.post("/rejectTrans", transactionsControllers.rejectTrans);
router.post("/approvedTrans", transactionsControllers.approvedTrans);

module.exports = router;
