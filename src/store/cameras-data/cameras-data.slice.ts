import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TCamerasData } from '../../types/state';
import { NameSpace } from '../../utils/const';
import { fetchCamerasAction } from './cameras-data.action';


const initialState: TCamerasData = {
  cameras: [],
  hasError: false,
  isDataLoading: false,
  shownItems: [],
};

export const camerasData = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {
    sortShownItems: (state , action: PayloadAction<number[]>) => {
      state.shownItems = [...state.cameras.slice(action.payload[0] , action.payload[1])];
    },

  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending , (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchCamerasAction.fulfilled , (state, action) => {
        state.isDataLoading = false;
        state.cameras = action.payload;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.isDataLoading = false;
        state.hasError = true;
      });
  }
});

export const {sortShownItems} = camerasData.actions;
