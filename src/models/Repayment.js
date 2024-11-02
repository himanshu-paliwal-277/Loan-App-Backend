import mongoose from "mongoose";
import loan from "./Loan.js";

const repaymentSchema = new mongoose.Schema({
    loan: { type: mongoose.Schema.Types.ObjectId, ref: loan, required: true },
    dueDate: { type: Date, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "pending" }, // pending, approved, rejected
});

const Repayment = mongoose.model("Repayment", repaymentSchema);

export default Repayment;