const express = require('express');
const router = express.Router();
const { validateTransaction } = require('../middlewares/validateTransaction'); 
const transactionController = require('../controllers/transactionController'); 

// Define POST route for handling transactions with validation
router.post('/transaction', validateTransaction, transactionController.handleTransaction);

module.exports = router;