import { createSlice } from '@reduxjs/toolkit';
import { TPromoData } from '../../types/state';
import { NameSpace } from '../../utils/const';
import { fetchPromoAction } from './promo-data.action';

const initialState : TPromoData = {
  promos : [],
  hasError : false,
};


export const promoData = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promos = action.payload;
      })
      .addCase(fetchPromoAction.rejected, (state) => {
        state.hasError = true;
      });
  }
});
