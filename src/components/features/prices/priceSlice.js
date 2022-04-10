import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCurrentPriceAsync = createAsyncThunk(
    "prices/getCurrentPriceAsync",
    async() => {
        const resp = await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc*per_page=50&page=1&sparkline=false`
        );
        if (resp.ok){
            const prices = await resp.json();
            return {prices};
        }
    }
); 

export const priceSlice = createSlice({
    name: "prices",
    initialState: [],
    reducers: {},
    extraReducers: {
        [getCurrentPriceAsync.fulfilled]: (state, action) => {
            return action.payload.prices;
        }
    },
});

export default priceSlice.reducer;