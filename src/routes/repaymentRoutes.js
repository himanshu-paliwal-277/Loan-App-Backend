import express from "express";
import { auth } from "../middleware/auth.js";
import {
  makeRepayment,
  getAllRepayments,
} from "../controllers/repaymentController.js";

const router = express.Router();

router.post("/make", auth, makeRepayment);
router.get("/:loanId", auth, getAllRepayments);

export default router;
