const Account = require('../models/bankModel');
const Transaction = require('../models/transactionModel');

exports.transferMoney = async (req, res) => {
  const { senderAccountNumber, receiverAccountNumber, amount } = req.body;

  if (amount <= 0) {
    return res.status(400).json({ message: 'Amount must be greater than 0' });
  }

  try {
    
    const senderAccount = await Account.findOne({ accountNumber: senderAccountNumber });
    const receiverAccount = await Account.findOne({ accountNumber: receiverAccountNumber });

    if (!senderAccount || !receiverAccount) {
      return res.status(404).json({ message: 'Sender or Receiver account not found' });
    }

    if (senderAccount.balance < amount) {
      return res.status(400).json({ message: 'Insufficient funds in sender account' });
    }

 
    senderAccount.balance -= amount;
    receiverAccount.balance += amount;

    await senderAccount.save();
    await receiverAccount.save();

   
    const transaction = new Transaction({
      senderAccount: senderAccount._id,
      receiverAccount: receiverAccount._id,
      amount,
    });
    await transaction.save();

    res.status(200).json({ message: 'Transaction successful', transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




exports.getTransactionHistory = async (req, res) => {
  const { accountNumber } = req.query;

  try {
   
    const account = await Account.findOne({ accountNumber });
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    
    const transactions = await Transaction.find({
      $or: [{ senderAccount: account._id }, { receiverAccount: account._id }],
    })
      .populate('senderAccount', 'accountNumber')
      .populate('receiverAccount', 'accountNumber')
      .sort({ timestamp: -1 });

    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
