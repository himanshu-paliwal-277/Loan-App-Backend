import express from 'express';
import { auth } from "../middleware/auth.js";
import { makeRepayment } from '../controllers/repaymentController.js';

const router = express.Router();

router.post('/make', auth, makeRepayment);

export default router;
