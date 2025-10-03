const { generateInvoice } = require("../services/invoiceService");
const { sendMail } = require("../services/mailService");
const config = require("../config");

async function sendInvoiceHandler(req, res) {
  try {
    const { orderId, requestId, amount, orderInfo, cart, recipientEmail, pdfBase64, html } = req.body || {};

    const toEmail = recipientEmail || config.mail.senderEmail;

    const pdfBuffer = pdfBase64
      ? Buffer.from(pdfBase64, "base64")
      : (await generateInvoice({ orderId, requestId, amount, orderInfo, cart, createdAt: new Date().toISOString() })).pdfBuffer;

    const builtHtml = html || (await generateInvoice({ orderId, requestId, amount, orderInfo, cart, createdAt: new Date().toISOString() })).html;

    const info = await sendMail({
      to: toEmail,
      subject: `Hóa đơn thanh toán - Order ${orderId || "N/A"}`,
      html: builtHtml,
      attachments: [
        {
          filename: `invoice-${orderId || "N-A"}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    res.json({ success: true, messageId: info.messageId });
  } catch (e) {
    console.error("Send invoice error:", e);
    res.status(500).json({ success: false, message: e.message });
  }
}

async function generateInvoiceHandler(req, res) {
  try {
    const { orderId, requestId, amount, orderInfo, cart } = req.body || {};
    const createdAt = new Date().toISOString();
    const { pdfBuffer, pdfBase64, html } = await generateInvoice({ orderId, requestId, amount, orderInfo, cart, createdAt });
    res.json({ success: true, pdfBase64, html });
  } catch (e) {
    console.error("Generate invoice error:", e);
    res.status(500).json({ success: false, message: e.message });
  }
}

module.exports = { sendInvoiceHandler, generateInvoiceHandler };


