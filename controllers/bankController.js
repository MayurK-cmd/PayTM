
const Account = require('../models/bankModel');

// exports.createBankAccount = async (req, res) => {
//   const { userId } = req.body;
//   const newAccount = new Account({ userId });

//   try {
//     await newAccount.save();
//     res.status(201).json(newAccount);
//   } catch (error) {
//     res.status(500).json({ error: 'Error creating account' });
//   }
// };

exports.createBankAccount = async (req, res) => {
  const { userId } = req.body;

  try {
   
    let accountNumber;
    let isUnique = false;
    while (!isUnique) {
      accountNumber = Math.floor(100000000 + Math.random() * 900000000).toString();
      const existingAccount = await Account.findOne({ accountNumber });
      if (!existingAccount) isUnique = true;
    }

    const newAccount = new Account({ userId, accountNumber });
    await newAccount.save();

    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ error: 'Error creating account' });
  }
};




exports.getBalance = async (req, res) => {
  const { accountNumber } = req.query;

  try {
    const account = await Account.findOne({ accountNumber });

    if (!account) {
      return res.status(404).json({ message: 'No account found!' });
    }

    res.status(200).json({ balance: account.balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
