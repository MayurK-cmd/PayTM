const express = require('express');
const {transferMoney, getTransactionHistory} = require('../controllers/transactionController');
const router = require('./authRoutes');


router.post('/transfer', transferMoney);
router.get('/history', getTransactionHistory);

module.exports = router;
