import Repayment from "../models/Repayment.js";
import Loan from "../models/Loan.js";

export const makeRepayment = async (req, res) => {
  try {
    const { repaymentId, amount } = req.body;

    // Find the repayment record
    const repayment = await Repayment.findById(repaymentId);
    if (!repayment) {
      return res.status(404).json({ message: "Repayment not found" });
    }

    // Check if the loan associated with the repayment is approved
    const loan = await Loan.findById(repayment.loan);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }
    if (loan.status !== "approved") {
      return res
        .status(403)
        .json({ message: "Loan is not approved. Cannot make repayment." });
    }

    // Check the repayment status
    if (repayment.status === "paid") {
      return res.status(400).json({ message: "Repayment already made" });
    }
    if (amount < repayment.amount) {
      return res.status(400).json({ message: "Insufficient amount" });
    }
    if (amount > repayment.amount) {
      return res
        .status(400)
        .json({ message: "Amount is greater than repayment" });
    }

    // Mark repayment as paid
    repayment.status = "paid";
    await repayment.save();

    // Check if all repayments for the loan are paid
    const pendingRepayments = await Repayment.find({
      loan: repayment.loan,
      status: "pending",
    });
    if (pendingRepayments.length === 0) {
      // Update loan status to paid if all repayments are complete
      loan.status = "paid"; 
      await loan.save();
    }

    res.status(200).json({ message: "Repayment successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllRepayments = async (req, res) => {
  try {
    const loanId = req.params.loanId;
    if (!loanId)
      return res.status(400).json({ message: "Loan ID is required" });

    const repayments = await Repayment.find({ loan: loanId });
    return res.status(200).json({ repayments });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
