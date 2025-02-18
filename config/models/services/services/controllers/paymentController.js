const { initiatePayment, completePayment } = require("../services/paymentService");
const { verifySignature } = require("../services/verificationService");

const startPayment = async (req, res) => {
  try {
    const { userId, amount, memo } = req.body;
    const payment = await initiatePayment(userId, amount, memo);
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleWebhook = async (req, res) => {
  try {
    const { transactionId, signature } = req.body;

    // Verifikasi tanda tangan
    const isValid = verifySignature(req.body, signature, process.env.PI_PUBLIC_KEY);
    if (!isValid) return res.status(400).json({ error: "Signature tidak valid!" });

    const success = await completePayment(transactionId);
    res.json({ success });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { startPayment, handleWebhook };
