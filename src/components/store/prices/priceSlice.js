import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { enableMapSet } from 'immer';

enableMapSet();
// https://api.coingecko.com/api/v3/simple/price?
// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false
//https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd

export const getCurrentPriceAsync = createAsyncThunk(
  "prices/getCurrentPriceAsync",
  async () => {
    const resp = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`
    );
    if (resp.ok) {
      const prices = await resp.json();
      const priceMap = new Map();
      for (var j = 0; j < prices.length; j++) {
        priceMap.set(prices[j].symbol, prices[j].current_price);
      };
      return { priceMap };
    }
  }
);

export const priceSlice = createSlice({
  name: "prices",
  initialState: new Map(),
  reducers: {},
  extraReducers: {
    [getCurrentPriceAsync.fulfilled]: (state, action) => {
      return action.payload;
    }
  },
});

export default priceSlice.reducer;
