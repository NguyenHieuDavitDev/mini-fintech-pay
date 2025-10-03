const express = require("express");
const { sendInvoiceHandler, generateInvoiceHandler } = require("../controllers/invoiceController");

const router = express.Router();

router.post("/send-invoice", sendInvoiceHandler);
router.post("/generate-invoice", generateInvoiceHandler);

module.exports = router;


