const express = require("express");
const { createPaymentHandler, momoIpnHandler } = require("../controllers/paymentController");

const router = express.Router();

router.post("/create-payment", createPaymentHandler);
router.post("/momo-ipn", momoIpnHandler);

module.exports = router;


