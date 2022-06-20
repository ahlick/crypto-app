import {createSlice } from "@reduxjs/toolkit";
import {getTransactionsAsync} from '../transaction/transactionSlice'
import {addTransactionAsync} from '../transaction/transactionSlice'

export const loadingSlice = createSlice({
    name: "loading", 
    initialState: {loading: false, isSuccess: false},
    reducers:{
        toggleLoading: (state) => !state, 
        // completeLoading: (state, action) => {
        //     return state
        // },
    }, 
    extraReducers: {
        [getTransactionsAsync.pending]: (state, action) => {state.loading = true}, 
        [getTransactionsAsync.fulfilled]: (state, action) => {state.loading = false}, 
        [addTransactionAsync.pending]: (state, action) => {state.loading = true}, 
        [addTransactionAsync.fulfilled]: (state, action) => {state.loading = false; state.isSuccess = true}
    }
})

export const selectLoading = state => state.loading;

export const {toggleLoading} = loadingSlice.actions;

export default loadingSlice.reducer;
