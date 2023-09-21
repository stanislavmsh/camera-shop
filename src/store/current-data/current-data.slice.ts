import { createSlice } from '@reduxjs/toolkit';
import { TCurrentData } from '../../types/state';
import { NameSpace } from '../../utils/const';
import { fetchCurrentAction, fetchReviewsAction, fetchSimilarAction } from './current-data.action';

const initialState: TCurrentData = {
  currentInfo : undefined,
  hasError: false,
  isDataLoading: false,
  similarCameras: [],
  reviews: [],
};

export const currentData = createSlice({
  name: NameSpace.Current,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchCurrentAction.fulfilled, (state, action) => {
        state.isDataLoading = false;
        state.currentInfo = action.payload;
      })
      .addCase(fetchSimilarAction.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchCurrentAction.rejected , (state) => {
        state.hasError = true;
      });
  }
});
