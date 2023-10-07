import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TCamerasData } from '../../types/state';
import { FilterCategory, FilterLevel, FilterType, NameSpace, SortingOption, SortingValues } from '../../utils/const';
import { fetchCamerasAction, fetchCamerasByPriceAction } from './cameras-data.action';


const initialState: TCamerasData = {
  cameras: [],
  filteredCameras: [],
  hasError: false,
  isDataLoading: false,
  shownItems: [],
  firstItem: 1,
  lastItem: 9,
};

type FilterPayloadAction = [FilterCategory | null, FilterType[], FilterLevel[]]

export const camerasData = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {
    sortShownItems: (state , action: PayloadAction<number[]>) => {
      state.shownItems = [...state.filteredCameras.slice(action.payload[0] , action.payload[1])];
      state.firstItem = action.payload[0];
      state.lastItem = action.payload[1];
    },
    sortCatalog: (state, action: PayloadAction<[SortingOption, SortingValues]>) => {
      const [sortingOption, sortingValue] = action.payload;

      switch (sortingOption) {
        case SortingOption.HighToLow:
          if (sortingValue === SortingValues.Price) {
            state.filteredCameras.sort((a, b) => b.price - a.price);
            state.shownItems = [...state.filteredCameras.slice(state.firstItem , state.lastItem)];
          }
          if (sortingValue === SortingValues.Rating) {
            state.filteredCameras.sort((a, b) => b.rating - a.rating);
            state.shownItems = [...state.filteredCameras.slice(state.firstItem , state.lastItem)];
          }
          break;

        case SortingOption.LowToHigh:
          if (sortingValue === SortingValues.Price) {
            state.filteredCameras.sort((a, b) => a.price - b.price);
            state.shownItems = [...state.filteredCameras.slice(state.firstItem , state.lastItem)];
          }
          if (sortingValue === SortingValues.Rating) {
            state.filteredCameras.sort((a, b) => a.rating - b.rating);
            state.shownItems = [...state.filteredCameras.slice(state.firstItem , state.lastItem)];
          }
          break;
      }
    },
    filterCameras: (state , action: PayloadAction<FilterPayloadAction>) => {
      const [category, types , levels] = action.payload;
      state.filteredCameras = [...state.cameras.filter((elem) => (
        (!category || (category === FilterCategory.Photo && elem.category === 'Фотоаппарат') || (category === FilterCategory.Video && elem.category === FilterCategory.Video)) &&
          (!types.length || types.includes(elem.type as FilterType)) &&
          (!levels.length || levels.includes(elem.level as FilterLevel))
      ))];
    }

  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending , (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchCamerasAction.fulfilled , (state, action) => {
        state.isDataLoading = false;
        state.cameras = action.payload;
        state.filteredCameras = action.payload;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.isDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchCamerasByPriceAction.fulfilled, (state, action) => {
        state.filteredCameras = action.payload;
      });
  }
});

export const {sortShownItems, sortCatalog, filterCameras} = camerasData.actions;
