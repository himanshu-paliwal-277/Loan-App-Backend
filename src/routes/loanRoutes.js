import express from 'express';
import {applyForLoan, approveLoan, getUserLoans} from '../controllers/loanController.js';
import {auth} from '../middleware/auth.js';
import {isAdmin} from '../middleware/isAdmin.js';

const router = express.Router();

router.post('/apply', auth, applyForLoan);
router.get('/', auth, getUserLoans);
router.patch('/approve/:loanId', auth, isAdmin, approveLoan);

export default router;
