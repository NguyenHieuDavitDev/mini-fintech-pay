const { generateInvoicePdf, buildInvoiceHtml } = require("../utils/invoicePdf");

async function generateInvoice({ orderId, requestId, amount, orderInfo, cart, createdAt }) {
  const pdfBuffer = await generateInvoicePdf({ orderId, requestId, amount, orderInfo, cart, createdAt });
  const pdfBase64 = pdfBuffer.toString("base64");
  const html = buildInvoiceHtml({ orderId, requestId, amount, orderInfo, cart, createdAt });
  return { pdfBuffer, pdfBase64, html };
}

module.exports = { generateInvoice };


