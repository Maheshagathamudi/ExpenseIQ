const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
    category: { type: String, required: true },
    paymentMethod: { type: String, default: "UPI" },
    currency: { type: String, default: "INR" },
    note: { type: String },
    source: { type: String, enum: ["manual", "csv", "ocr", "recurring"], default: "manual" },
    isRecurring: { type: Boolean, default: false },
    recurringFrequency: { type: String, enum: ["none", "daily", "weekly", "monthly"], default: "none" },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);