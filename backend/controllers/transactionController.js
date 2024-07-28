const Account = require('../models/account');
const Transaction = require('../models/transaction');
const { validationResult } = require('express-validator');

exports.handleTransaction = async (req, res) => {
  const { account_id, amount, type } = req.body;
  const errors = validationResult(req);

    // Check for validation errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {

        // Find account by primary key
    const account = await Account.findByPk(account_id);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    let transaction;
    const amountFloat = parseFloat(amount);


        // Handle deposit transaction
    if (type === 'deposit') {
      account.balance = parseFloat(account.balance) + amountFloat;
      await account.save();

      transaction = await Transaction.create({
        account_id,
        amount: amountFloat,
        type,
      });

      return res.status(200).json({
        message: 'Deposit successful',
        account: {
          id: account.id,
          name: account.name,
          balance: account.balance, 
          createdAt: account.createdAt,
          updatedAt: account.updatedAt
        },
        transaction: {
          id: transaction.id,
          account_id: transaction.account_id,
          amount: transaction.amount,
          type: transaction.type,
          createdAt: transaction.createdAt
        }
      });
          // Handle withdrawal transaction
    } else if (type === 'withdrawal') {
      if (account.balance >= amountFloat) {
        account.balance -= amountFloat;
        await account.save();

        transaction = await Transaction.create({
          account_id,
          amount: amountFloat,
          type,
        });

        return res.status(200).json({
          message: 'Withdrawal successful',
          account: {
            id: account.id,
            name: account.name,
            balance: account.balance, 
            createdAt: account.createdAt,
            updatedAt: account.updatedAt
          },
          transaction: {
            id: transaction.id,
            account_id: transaction.account_id,
            amount: transaction.amount,
            type: transaction.type,
            createdAt: transaction.createdAt
          }
        });
      } else {
        return res.status(400).json({ message: 'Insufficient funds' });
      }
          // Handle invalid transaction type
    } else {
      return res.status(400).json({ message: 'Invalid transaction type' });
    }
  } catch (error) {
    console.error('Error processing transaction:', error);
    return res.status(500).send('Error processing transaction: ' + error.message);
  }
};
