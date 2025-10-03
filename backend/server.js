// khai báo thư viện
const express = require("express");
const cors = require("cors");
const config = require("./config");
const paymentRoutes = require("./routes/paymentRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");

const app = express();

// ====== Middleware ======
app.use(cors({ origin: config.server.cors.origin }));
app.use(express.json());

// ====== Routes ======
app.use("/", paymentRoutes);
app.use("/", invoiceRoutes);

// ====== Start server ======
const PORT = config.server.port;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
