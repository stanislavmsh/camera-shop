import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TCamerasData } from '../../types/state';
import { FilterCategory, FilterLevel, FilterType, NameSpace, SortingOption, SortingValues } from '../../utils/const';
import { fetchCamerasAction, fetchCamerasByPriceAction } from './cameras-data.action';
import { TCamera } from '../../types/camera';


const initialState: TCamerasData = {
  cameras: [],
  sortedCameras: [],
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
      state.shownItems = [...state.sortedCameras.slice(action.payload[0] , action.payload[1])];
      state.firstItem = action.payload[0];
      state.lastItem = action.payload[1];
    },
    sortCatalog: (state, action: PayloadAction<[SortingOption, SortingValues]>) => {
      const [sortingOption, sortingValue] = action.payload;

      switch (sortingOption) {
        case SortingOption.HighToLow:
          if (sortingValue === SortingValues.Price) {
            state.sortedCameras.sort((a, b) => b.price - a.price);
            state.shownItems = [...state.sortedCameras.slice(state.firstItem , state.lastItem)];
          }
          if (sortingValue === SortingValues.Rating) {
            state.sortedCameras.sort((a, b) => b.rating - a.rating);
            state.shownItems = [...state.sortedCameras.slice(state.firstItem , state.lastItem)];
          }
          break;

        case SortingOption.LowToHigh:
          if (sortingValue === SortingValues.Price) {
            state.sortedCameras.sort((a, b) => a.price - b.price);
            state.shownItems = [...state.sortedCameras.slice(state.firstItem , state.lastItem)];
          }
          if (sortingValue === SortingValues.Rating) {
            state.sortedCameras.sort((a, b) => a.rating - b.rating);
            state.shownItems = [...state.sortedCameras.slice(state.firstItem , state.lastItem)];
          }
          break;
      }
    },
    resetFilters: (state) => {
      state.sortedCameras = [...state.cameras];
    },
    // убрать
    setNewSortedCameras: (state, action: PayloadAction<TCamera[]>) => {
      state.sortedCameras = action.payload;
    },
    //
    filterCameras: (state , action: PayloadAction<FilterPayloadAction>) => {
      const [category, types , levels] = action.payload;
      const filteredCameras = [...state.sortedCameras.filter((elem) => {
        if(category) {
          if(category === FilterCategory.Photo) {
            return elem.category === 'Фотоаппарат';
          }
          return elem.category === FilterCategory.Video;
        }
        return elem;
      })];

      console.log(filteredCameras.length);

      // state.sortedCameras = filteredCameras;
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
        state.sortedCameras = action.payload;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.isDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchCamerasByPriceAction.fulfilled, (state, action) => {
        state.sortedCameras = action.payload;
      });
  }
});

export const {sortShownItems, sortCatalog, resetFilters, setNewSortedCameras, filterCameras} = camerasData.actions;
