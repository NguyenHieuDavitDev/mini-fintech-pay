require("dotenv").config();

// Application configuration centralized here (values from environment variables)
const config = {
  server: {
    port: Number(process.env.PORT || 3000),
    cors: {
      origin: process.env.SERVER_CORS_ORIGIN || "http://localhost:3001",
    },
  },
  momo: {
    partnerCode: process.env.MOMO_PARTNER_CODE || "MOMO",
    accessKey: process.env.MOMO_ACCESS_KEY || "",
    secretKey: process.env.MOMO_SECRET_KEY || "",
    redirectUrl: process.env.MOMO_REDIRECT_URL || "http://localhost:3001/momo-return",
    ipnUrl: process.env.MOMO_IPN_URL || "http://localhost:3000/momo-ipn",
    requestType: process.env.MOMO_REQUEST_TYPE || "payWithMethod",
    lang: process.env.MOMO_LANG || "vi",
  },
  mail: {
    senderEmail: process.env.MAIL_SENDER_EMAIL || "",
    senderPass: process.env.MAIL_SENDER_PASS || "",
    defaultFromName: process.env.MAIL_DEFAULT_FROM_NAME || "MoMo Shop",
  },
};

module.exports = config;
