import express from "express";
import {
  applyForLoan,
  approveLoan,
  getUserLoans,
  getAllLoansDetails,
  rejectLoan,
} from "../controllers/loanController.js";
import { auth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

router.post("/apply", auth, applyForLoan);
router.get("/", auth, getUserLoans);
router.patch("/approve/:loanId", auth, isAdmin, approveLoan);
router.patch("/reject/:loanId", auth, isAdmin, rejectLoan);
router.get("/allDetails", auth, isAdmin, getAllLoansDetails);

export default router;
