const { createPayment } = require("../services/momoService");
const { generateInvoice } = require("../services/invoiceService");
const { sendMail } = require("../services/mailService");
const config = require("../config");

async function createPaymentHandler(req, res) {
  try {
    const { amount, orderInfo } = req.body;
    const response = await createPayment({ amount, orderInfo });
    res.json(response);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

async function momoIpnHandler(req, res) {
  try {
    const {
      orderId,
      requestId,
      amount,
      orderInfo,
      message,
      resultCode,
      extraData,
      signature,
      responseTime,
    } = req.body || {};

    if (Number(resultCode) === 0) {
      try {
        const { pdfBuffer } = await generateInvoice({
          orderId,
          requestId,
          amount,
          orderInfo,
          cart: [],
          createdAt: responseTime,
        });

        await sendMail({
          to: config.mail.senderEmail,
          subject: `Hóa đơn thanh toán thành công - Order ${orderId}`,
          html: `
            <div style="font-family: 'Noto Sans', Helvetica, Arial, sans-serif; color:#222;">
              <h2 style="margin:0 0 8px 0;">Thanh toán thành công</h2>
              <p style="margin:0 0 12px 0;">Cảm ơn bạn đã mua sắm. Hóa đơn PDF được đính kèm.</p>
              <ul style="padding-left:16px; margin:0;">
                <li><strong>Order ID:</strong> ${orderId}</li>
                <li><strong>Request ID:</strong> ${requestId}</li>
                <li><strong>Số tiền:</strong> ${amount} VND</li>
                <li><strong>Nội dung:</strong> ${orderInfo}</li>
                <li><strong>Thời gian:</strong> ${responseTime || new Date().toISOString()}</li>
              </ul>
            </div>
          `,
          attachments: [
            {
              filename: `invoice-${orderId}.pdf`,
              content: pdfBuffer,
            },
          ],
        });
      } catch (mailErr) {
        console.error("Send IPN invoice email error:", mailErr);
      }
    }

    res.json({ resultCode: 0, message: "Received" });
  } catch (e) {
    console.error("IPN error:", e);
    res.status(500).json({ resultCode: 1, message: e.message });
  }
}

module.exports = { createPaymentHandler, momoIpnHandler };


