import{configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import transactionReducer from './transaction/transactionSlice';
import priceReducer from './prices/priceSlice'
import loadingReducer from './loading/loadingSlice'

const store = configureStore({
    reducer: {
       transactions: transactionReducer,
       prices: priceReducer,
       loading: loadingReducer
    }, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

export default store;
