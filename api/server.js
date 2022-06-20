const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { json } = require('body-parser');
const { nanoid } = require('nanoid');

dotenv.config({ path: './config.env' });

const app = express();

app.use(cors());
app.use(json());

let transactions = [];

app.get('/transactions', (req, res) => res.send(transactions));

app.post('/transactions', (req, res) => {
    const transaction = { 
        id: nanoid(), 
        tokenCode: req.body.tokenCode, 
        numberOfToken: req.body.numberOfToken,
        purchasePrice: req.body.purchasePrice};
    transactions.push(transaction);
    return res.send(transaction);
});

app.patch('/transactions/:id', (req, res) => {
    const id = req.params.id;
    const index = transactions.findIndex((transaction) => transaction.id == id);
    const currentPrice = req.body.currentPrice;
    if (index > -1) {
        transactions[index].currentPrice = currentPrice;
    }
    return res.send(transactions[index]);
});

app.delete('/transactions/:id', (req, res) => {
    const id = req.params.id;
    const index = transactions.findIndex((transaction) => transaction.id == id);
    if (index > -1) {
        transactions.splice(index, 1);
    }

    res.send(transactions);
});

const PORT = 7000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
