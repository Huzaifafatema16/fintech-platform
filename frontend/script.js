const apiUrl = 'http://localhost:3000/account';

async function deposit() {
    const accountId = document.getElementById('accountId').value;
    const amount = document.getElementById('amount').value;
    const response = await fetch('${apiUrl}/deposit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: accountId, amount: amount }),
    });
    const result = await response.json();
    document.getElementById('result').innerText = JSON.stringify(result);
}

async function withdraw() {
    const accountId = document.getElementById('accountId').value;
    const amount = document.getElementById('amount').value;
    const response = await fetch('${apiUrl}/withdraw', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: accountId, amount: amount }),
    });
    const result = await response.json();
    document.getElementById('result').innerText = JSON.stringify(result);
}