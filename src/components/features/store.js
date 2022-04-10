import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from './transaction/transactionSlice';
import priceReducer from './prices/priceSlice';

const store = configureStore({
    reducer:{
        transactions: transactionReducer,
        prices: priceReducer
    }
});

export default store