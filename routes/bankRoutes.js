const express = require('express');
const router = express.Router();
const BankAccountcontroller = require('../controllers/bankController');


router.post('/create', BankAccountcontroller.createBankAccount);
router.get('/balance', BankAccountcontroller.getBalance);

module.exports = router;