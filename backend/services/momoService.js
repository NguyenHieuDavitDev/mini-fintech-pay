const https = require("https");
const crypto = require("crypto");
const config = require("../config");

function signRequest(params) {
  const {
    accessKey,
    secretKey,
    ipnUrl,
    redirectUrl,
    requestType,
  } = config.momo;

  const rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    params.amount +
    "&extraData=" +
    (params.extraData || "") +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    params.orderId +
    "&orderInfo=" +
    params.orderInfo +
    "&partnerCode=" +
    config.momo.partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    params.requestId +
    "&requestType=" +
    requestType;

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  return signature;
}

function createPayment({ amount, orderInfo }) {
  return new Promise((resolve, reject) => {
    const { partnerCode, requestType, lang, ipnUrl, redirectUrl } = config.momo;
    const orderId = partnerCode + new Date().getTime();
    const requestId = orderId;
    const extraData = "";

    const signature = signRequest({ amount, orderInfo, orderId, requestId, extraData });

    const requestBody = JSON.stringify({
      partnerCode,
      partnerName: "Test",
      storeId: "MomoTestStore",
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      lang,
      requestType,
      autoCapture: true,
      extraData,
      signature,
    });

    const options = {
      hostname: "test-payment.momo.vn",
      port: 443,
      path: "/v2/gateway/api/create",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(requestBody),
      },
    };

    const momoReq = https.request(options, (momoRes) => {
      let data = "";
      momoRes.on("data", (chunk) => (data += chunk));
      momoRes.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    });

    momoReq.on("error", (e) => reject(e));
    momoReq.write(requestBody);
    momoReq.end();
  });
}

module.exports = { createPayment };


