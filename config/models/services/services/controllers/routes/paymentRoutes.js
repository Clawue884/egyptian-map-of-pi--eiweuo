const express = require("express");
const { startPayment, handleWebhook } = require("../controllers/paymentController");

const router = express.Router();

router.post("/start-payment", startPayment);
router.post("/webhook", handleWebhook);

module.exports = router;
