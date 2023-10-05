import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TCamerasData } from '../../types/state';
import { NameSpace, SortingOption, SortingValues } from '../../utils/const';
import { fetchCamerasAction } from './cameras-data.action';


const initialState: TCamerasData = {
  cameras: [],
  hasError: false,
  isDataLoading: false,
  shownItems: [],
  firstItem: 1,
  lastItem: 9,
};

export const camerasData = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {
    sortShownItems: (state , action: PayloadAction<number[]>) => {
      state.shownItems = [...state.cameras.slice(action.payload[0] , action.payload[1])];
      state.firstItem = action.payload[0];
      state.lastItem = action.payload[1];
    },
    sortCatalog: (state, action: PayloadAction<[SortingOption, SortingValues]>) => {
      const [sortingOption, sortingValue] = action.payload;

      switch (sortingOption) {
        case SortingOption.HighToLow:
          if (sortingValue === SortingValues.Price) {
            state.cameras.sort((a, b) => b.price - a.price);
            state.shownItems = [...state.cameras.slice(state.firstItem , state.lastItem)];
          }
          if (sortingValue === SortingValues.Rating) {
            state.cameras.sort((a, b) => b.rating - a.rating);
            state.shownItems = [...state.cameras.slice(state.firstItem , state.lastItem)];
          }
          break;

        case SortingOption.LowToHigh:
          if (sortingValue === SortingValues.Price) {
            state.cameras.sort((a, b) => a.price - b.price);
            state.shownItems = [...state.cameras.slice(state.firstItem , state.lastItem)];
          }
          if (sortingValue === SortingValues.Rating) {
            state.cameras.sort((a, b) => a.rating - b.rating);
            state.shownItems = [...state.cameras.slice(state.firstItem , state.lastItem)];
          }
          break;
      }
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

export const {sortShownItems, sortCatalog} = camerasData.actions;
