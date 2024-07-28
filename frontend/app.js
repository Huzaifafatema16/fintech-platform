// Update the API URL to match your backend's IP and port
const apiUrl = 'http://localhost:3000/api/transaction';

// Execute code when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add event listener to the form submission
  document.getElementById('transactionForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Get values from the form fields
    const accountId = document.getElementById('accountId').value;
    const amount = document.getElementById('amount').value;
    const type = document.getElementById('type').value;

    // Perform the transaction
    await performTransaction(accountId, amount, type);
  });
});

// Function to perform a transaction by making an API call
async function performTransaction(accountId, amount, type) {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ account_id: parseInt(accountId), amount: parseFloat(amount), type }),
    });

    // Check if the response is not OK
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    console.log('Result:', result);

        // Display the result message
    document.getElementById('result').innerText = result.message;

        // Display transaction details if available
    if (result.account) {
      const balance = Number(result.account.balance);
      if (isNaN(balance)) {
        throw new Error('Invalid balance value');
      }

      const accountDetails = `
        Account ID: ${result.account.id}
        Name: ${result.account.name}
        Balance: ${balance.toFixed(2)}
        Created At: ${new Date(result.account.createdAt).toLocaleString()}
        Updated At: ${new Date(result.account.updatedAt).toLocaleString()}
      `;
      document.getElementById('accountDetails').innerText = accountDetails;
    }

    if (result.transaction) {
      const transactionAmount = Number(result.transaction.amount);
      if (isNaN(transactionAmount)) {
        throw new Error('Invalid transaction amount');
      }

      const transactionDetails = `
        Transaction ID: ${result.transaction.id}
        Account ID: ${result.transaction.account_id}
        Amount: ${transactionAmount.toFixed(2)}
        Type: ${result.transaction.type}
        Created At: ${new Date(result.transaction.createdAt).toLocaleString()}
      `;
      document.getElementById('transactionDetails').innerText = transactionDetails;
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('result').innerText = 'An error occurred: ' + error.message;
  }
}
