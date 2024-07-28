const { body } = require('express-validator');

const validateTransaction = [
  body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
  body('account_id').isInt().withMessage('Account ID must be an integer'),
  body('type').isString().isIn(['deposit', 'withdrawal']).withMessage('Transaction type must be either deposit or withdrawal')
];

module.exports = { validateTransaction };

// Middleware for validating transaction input using express-validator.
// Checks for positive float amount, integer account_id, and valid transaction type.
