const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Transaction = require('./models/transaction');
const Account = require('./models/account');
const transactionRoutes = require('./routes/transaction'); 
const config = require('./config/config'); 
const { Sequelize } = require('sequelize');

const app = express();
const port = 3000;

// Create a new instance of Sequelize with the correct config object
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

// Configure CORS to allow requests from specific origins or all origins
app.use(cors({
  //origin: ['http://192.168.1.9:8080', 'http://127.0.0.1:8080', 'http://172.17.240.1:8080'],
  origin:'*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// Parse JSON bodies
app.use(bodyParser.json());
app.options('*', cors()); // Handle preflight requests

// Use the transaction routes
app.use('/api', transactionRoutes);

// Define a simple route to handle transactions directly for testing
app.post('/api/transaction', async (req, res) => {
  const { account_id, amount, type } = req.body;

  try {
    const account = await Account.findByPk(account_id);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // Convert amount to a number for calculations
    const amountFloat = parseFloat(amount);

    // Update balance as a float
    if (type === 'deposit') {
      account.balance = parseFloat(account.balance) + amountFloat;
    } else if (type === 'withdrawal') {
      account.balance = parseFloat(account.balance) - amountFloat;
    } else {
      return res.status(400).json({ message: 'Invalid transaction type' });
    }

    await account.save();

    const transaction = await Transaction.create({ account_id, amount: amountFloat, type });

    res.json({
      message: 'Transaction processed successfully',
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
  } catch (error) {
    console.error('Error processing transaction:', error);
    res.status(500).json({ message: 'Error processing transaction' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
