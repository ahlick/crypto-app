import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

// https://api.coingecko.com/api/v3/simple/price?
// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false

const slowCode = async() => {
  return new Promise(function(resolve, reject){
    setTimeout(resolve, 2000);
  })
}

export const getTransactionsAsync = createAsyncThunk(
  "transactions/getTransactionsAsync",
  async () => {
    await slowCode();
    const resp = await fetch("http://localhost:7000/transactions");
    if (resp.ok) {
      const transactions = await resp.json();
      return { transactions };
    }
  }
);

export const addTransactionAsync = createAsyncThunk(
  "transactions/addTransactionAsync",
  async (payload) => {
    const resp = await fetch("http://localhost:7000/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tokenCode: payload.tokenCode,
        numberOfToken: payload.numberOfToken,
        purchasePrice: payload.purchasePrice,
      }),
    });

    if (resp.ok) {
      await slowCode();
      const transaction = await resp.json();
      return { transaction };
    }
  }
);

export const updatePriceAsync = createAsyncThunk(
  'todos/updatePriceAsync',
  async (payload) => {
    const resp = await fetch(`http://localhost:7000/transactions/${payload.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ currentPrice: payload.currentPrice }),
    });
    if (resp.ok) {
      const transaction = await resp.json();
      return { transaction };
    }
  }
);

export const deleteTransactionAsync = createAsyncThunk(
  "transactions/deleteTransactionAsync",
  async (payload) => {
    const resp = await fetch(
      `http://localhost:7000/transactions/${payload.id}`,
      {
        method: "DELETE",
      }
    );

    if (resp.ok) {
      return { id: payload.id };
    }
  }
);

export const transactionSlice = createSlice({
  name: "transactions",
  initialState: [],
  reducers: {
    addTransaction: (state, action) => {
      const transaction = {
        id: nanoid(),
        tokenCode: action.payload.tokenCode,
        numberOfToken: action.payload.numberOfToken,
        purchasePrice: action.payload.purchasePrice,
        currentPrice: action.payload.currentPrice
      };
      state.push(transaction);
      console.log("addtransslice", transaction);
    },
    updatePrice: (state, action) => {
      const index = state.findIndex((transaction) => transaction.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTransaction: (state, action) => {
      return state.filter(
        (transaction) => transaction.id !== action.payload.id
      );
    },
  },
  extraReducers: {
    [getTransactionsAsync.fulfilled]: (state, action) => {
      return action.payload.transactions;
    },
    [addTransactionAsync.fulfilled]: (state, action) => {
      state.push(action.payload.transaction);
    },
    [updatePriceAsync.fulfilled]: (state, action) => {
      const index = state.findIndex(
        (transaction) => transaction.id === action.payload.transaction.id
      );
      state[index].completed = action.payload.transaction.completed;
    },
    [deleteTransactionAsync.fulfilled]: (state, action) => {
      return state.filter(
        (transaction) => transaction.id !== action.payload.id
      );
    },
  },
});

export const { addTransaction, updatePrice,  deleteTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
