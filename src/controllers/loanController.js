import Loan from "../models/Loan.js";
import Repayment from "../models/Repayment.js";

export const applyForLoan = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { amount, term } = req.body;
    // Create loan
    const newLoan = new Loan({ amount, term, user: userId });
    await newLoan.save();
    
    // Generate repayment schedule
    const weeklyAmount = (amount / term).toFixed(2);
    for (let i = 1; i <= term; i++) {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + i * 7); // Each repayment a week apart
      
      const repayment = new Repayment({
        loan: newLoan._id,
        dueDate,
        amount: weeklyAmount
      });
      await repayment.save();
    }

    
    res.status(201).json({ message: 'Loan application submitted', loan: newLoan });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const approveLoan = async (req, res) => {
  try {
    const loanId = req.params.loanId;
    const loan = await Loan.findById(loanId);
    
    if (!loan) return res.status(404).json({ message: 'Loan not found' });
    if (loan.status !== 'pending') return res.status(400).json({ message: 'Loan already approved' });
    
    loan.status = 'approved';
    await loan.save();
    
    res.status(200).json({ message: 'Loan approved', loan });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserLoans = async (req, res) => {
  const userId = req.user.userId;
  console.log("req.user = ", req.user);
  try {
    const loans = await Loan.find({ user: userId });
    res.status(200).json({ loans });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
