const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  prompt: { type: mongoose.Schema.Types.ObjectId, ref: "Prompt", required: true },
  pricePaid: { type: Number, required: true },
  razorpayPaymentId: { type: String },
  paymentStatus: { type: String, enum: ["SUCCESS", "FAILED", "PENDING"], default: "PENDING" },
  purchasedAt: { type: Date, default: Date.now },
  promptSnapshot: { // store snapshot for deleted prompts
    title: String,
    description: String,
    promptText: String,
    attachment: Object,
    uploadCode: [Object],
  },
});

module.exports = mongoose.model("Purchase", PurchaseSchema);
