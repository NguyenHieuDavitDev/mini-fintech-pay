const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

function registerRobotoFonts(doc) {
  const result = { hasRegular: false, hasBold: false };
  try {
    const fontsDir = path.join(__dirname, "..", "assets", "fonts");
    const robotoRegular = path.join(fontsDir, "Roboto-Regular.ttf");
    const robotoBold = path.join(fontsDir, "Roboto-Bold.ttf");

    if (fs.existsSync(robotoRegular)) {
      doc.registerFont("roboto-regular", robotoRegular);
      result.hasRegular = true;
    }
    if (fs.existsSync(robotoBold)) {
      doc.registerFont("roboto-bold", robotoBold);
      result.hasBold = true;
    }
  } catch (_) {
   
  }
  return result;
}

function formatCurrencyVnd(value) {
  try {
    const num = Number(value || 0);
    return num.toLocaleString("vi-VN") + " ₫";
  } catch (_) {
    return `${value} VND`;
  }
}

function drawHeader(doc, fonts) {
  doc
    .font(fonts.bold)
    .fontSize(20)
    .fillColor("#111")
    .text("HÓA ĐƠN THANH TOÁN", { align: "center" })
    .moveDown(0.5);

  doc
    .font(fonts.regular)
    .fontSize(10)
    .fillColor("#555")
    .text("Pickerpall Shop", { align: "center" })
    .text("33 Xô Viết Nghệ Tĩnh, Hòa Cường, Hải Châu, Đà Nẵng", { align: "center" })
    .text("Điện thoại: 0123 456 789", { align: "center" })
    .moveDown(1);

  doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor("#ddd").stroke();
  doc.moveDown(1);
}

function drawOrderInfo(doc, info, fonts) {
  const { orderId, requestId, orderInfo, createdAt } = info;
  doc
    .font(fonts.regular)
    .fontSize(12)
    .fillColor("#111")
    .text(`Mã đơn hàng: ${orderId || "N/A"}`)
    .text(`Mã yêu cầu: ${requestId || "N/A"}`)
    .text(`Ngày lập: ${createdAt || new Date().toLocaleString("vi-VN")}`)
    .moveDown(0.5)
    .font(fonts.regular)
    .fontSize(11)
    .fillColor("#444")
    .text(`Nội dung: ${orderInfo || "N/A"}`)
    .moveDown(1);
}

function drawItemsTable(doc, cart, fonts) {
  const items = Array.isArray(cart) ? cart : [];
  const tableTop = doc.y;
  const colX = [50, 280, 360, 450, 520];

  // Header
  doc
    .font(fonts.bold)
    .fontSize(11)
    .fillColor("#111")
    .text("Sản phẩm", colX[0], tableTop)
    .text("SL", colX[1], tableTop, { width: 60, align: "right" })
    .text("Đơn giá", colX[2], tableTop, { width: 80, align: "right" })
    .text("Thành tiền", colX[3], tableTop, { width: 100, align: "right" });

  let y = tableTop + 18;
  doc.moveTo(50, y - 4).lineTo(545, y - 4).strokeColor("#ddd").stroke();

  items.forEach((item) => {
    const lineHeight = 18;
    const name = item.name || "Sản phẩm";
    const quantity = Number(item.quantity || 1);
    const price = Number(item.price || 0);
    const total = quantity * price;

    doc
      .font(fonts.regular)
      .fontSize(10)
      .fillColor("#333")
      .text(name, colX[0], y, { width: 220 })
      .text(String(quantity), colX[1], y, { width: 60, align: "right" })
      .text(formatCurrencyVnd(price), colX[2], y, { width: 80, align: "right" })
      .text(formatCurrencyVnd(total), colX[3], y, { width: 100, align: "right" });

    y += lineHeight;
  });

  doc.moveDown(1);
}

function drawTotals(doc, cart, amount, fonts) {
  const items = Array.isArray(cart) ? cart : [];
  const calcSubtotal = items.reduce(
    (sum, it) => sum + Number(it.price || 0) * Number(it.quantity || 1),
    0
  );
  const paidTotal = typeof amount !== "undefined" ? Number(amount) : calcSubtotal;

  const labelX = 360;
  const valueX = 460;
  const lineH = 18;
  let y = doc.y;

  doc
    .font(fonts.regular)
    .fontSize(11)
    .fillColor("#111")
    .text("Tạm tính:", labelX, y, { width: 90, align: "right" })
    .text(formatCurrencyVnd(calcSubtotal), valueX, y, { width: 100, align: "right" });
  y += lineH;

  doc
    .font(fonts.regular)
    .fontSize(11)
    .fillColor("#111")
    .text("Giảm giá:", labelX, y, { width: 90, align: "right" })
    .text(formatCurrencyVnd(0), valueX, y, { width: 100, align: "right" });
  y += lineH;

  doc.moveTo(360, y - 4).lineTo(545, y - 4).strokeColor("#ddd").stroke();

  doc
    .font(fonts.bold)
    .fontSize(12)
    .fillColor("#111")
    .text("Tổng cộng:", labelX, y, { width: 90, align: "right" })
    .text(formatCurrencyVnd(paidTotal), valueX, y, { width: 100, align: "right" });

  doc.moveDown(1.5);
}

function drawFooter(doc, fonts) {
  doc
    .moveDown(1)
    .font(fonts.regular)
    .fontSize(10)
    .fillColor("#666")
    .text(
      "Cảm ơn bạn đã mua sắm tại Shop. Vui lòng giữ lại hóa đơn này để đối chiếu khi cần.",
      { align: "center" }
    );
}

function generateInvoicePdf({ orderId, requestId, amount, orderInfo, cart, createdAt }) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      const chunks = [];

      const registered = registerRobotoFonts(doc);
      const fonts = {
        regular: registered.hasRegular ? "roboto-regular" : "Helvetica",
        bold: registered.hasBold ? "roboto-bold" : "Helvetica-Bold",
      };
      doc.font(fonts.regular);

      doc.on("data", (d) => chunks.push(d));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", (err) => reject(err));

      drawHeader(doc, fonts);
      drawOrderInfo(doc, { orderId, requestId, orderInfo, createdAt }, fonts);
      drawItemsTable(doc, cart, fonts);
      drawTotals(doc, cart, amount, fonts);
      drawFooter(doc, fonts);

      doc.end();
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = { generateInvoicePdf };
/**
 * Build invoice HTML (for email preview on frontend or alternative email body)
 */
function buildInvoiceHtml({ orderId, requestId, amount, orderInfo, cart, createdAt }) {
  const items = Array.isArray(cart) ? cart : [];
  const rows = items
    .map(
      (it) => `
        <tr>
          <td style="padding:8px 12px; border-bottom:1px solid #eee;">${it.name}</td>
          <td style="padding:8px 12px; border-bottom:1px solid #eee; text-align:right;">${it.quantity}</td>
          <td style="padding:8px 12px; border-bottom:1px solid #eee; text-align:right;">${Number(it.price||0).toLocaleString('vi-VN')} ₫</td>
          <td style="padding:8px 12px; border-bottom:1px solid #eee; text-align:right;">${(Number(it.quantity||1)*Number(it.price||0)).toLocaleString('vi-VN')} ₫</td>
        </tr>`
    )
    .join("");

  const subtotal = items.reduce((s, it) => s + Number(it.price||0)*Number(it.quantity||1), 0);
  const total = typeof amount !== 'undefined' ? Number(amount) : subtotal;

  return `
  <div style="font-family: Roboto, 'Noto Sans', Helvetica, Arial, sans-serif; color:#222;">
    <h2 style="margin:0 0 12px 0;">Hóa đơn thanh toán</h2>
    <p style="margin:0 0 8px 0; font-size:14px;">
      <strong>Mã đơn hàng:</strong> ${orderId || 'N/A'}<br/>
      <strong>Mã yêu cầu:</strong> ${requestId || 'N/A'}<br/>
      <strong>Ngày lập:</strong> ${createdAt || new Date().toLocaleString('vi-VN')}<br/>
      <strong>Nội dung:</strong> ${orderInfo || 'N/A'}
    </p>
    <table style="width:100%; border-collapse:collapse; font-size:14px;">
      <thead>
        <tr style="text-align:left; background:#f7f7f9;">
          <th style="padding:10px 12px;">Sản phẩm</th>
          <th style="padding:10px 12px; text-align:right;">SL</th>
          <th style="padding:10px 12px; text-align:right;">Đơn giá</th>
          <th style="padding:10px 12px; text-align:right;">Thành tiền</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
    <div style="margin-top:12px; text-align:right; font-size:14px;">
      <div>Tạm tính: <strong>${subtotal.toLocaleString('vi-VN')} ₫</strong></div>
      <div>Giảm giá: <strong>0 ₫</strong></div>
      <div style="margin-top:4px; font-size:16px;">Tổng cộng: <strong>${total.toLocaleString('vi-VN')} ₫</strong></div>
    </div>
    <p style="margin-top:16px; color:#666; font-size:13px;">Cảm ơn bạn đã mua sắm tại MoMo Shop.</p>
  </div>`;
}

module.exports.buildInvoiceHtml = buildInvoiceHtml;