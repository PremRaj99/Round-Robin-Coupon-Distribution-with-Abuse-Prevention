import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  couponId: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon" },
  amount: Number,
  discountApplied: Number,
  finalAmount: Number,
  paymentMethod: { type: String, enum: ["cash", "card", "online"] },
  status: { type: String, enum: ["pending", "completed", "failed"] },
  createdAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
