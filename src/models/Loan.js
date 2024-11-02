import mongoose from "mongoose";
import user from "./User.js";

const loanSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  term: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: user, required: true },
  status: { type: String, default: "pending" }, // pending, approved, rejected
});

const Loan = mongoose.model("Loan", loanSchema);

export default Loan;
