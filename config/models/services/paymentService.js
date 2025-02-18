const { PiNetwork } = require("../config/piConfig");
const Transaction = require("../models/transactionModel");

const initiatePayment = async (userId, amount, memo) => {
  try {
    const payment = await PiNetwork.createPayment({
      amount,
      memo,
      metadata: { userId },
    });

    const newTransaction = new Transaction({
      userId,
      transactionId: payment.identifier,
      amount,
      status: "pending",
    });

    await newTransaction.save();
    return payment;
  } catch (error) {
    throw new Error("Gagal memproses pembayaran.");
  }
};

const completePayment = async (transactionId) => {
  try {
    const payment = await PiNetwork.getPayment(transactionId);

    if (payment.status === "completed") {
      await Transaction.findOneAndUpdate({ transactionId }, { status: "completed" });
      return true;
    }

    return false;
  } catch (error) {
    throw new Error("Gagal menyelesaikan pembayaran.");
  }
};

module.exports = { initiatePayment, completePayment };
