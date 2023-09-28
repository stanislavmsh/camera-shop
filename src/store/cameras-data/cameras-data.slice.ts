import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TCamerasData } from '../../types/state';
import { NameSpace } from '../../utils/const';
import { fetchCamerasAction } from './cameras-data.action';
import { TCamera } from '../../types/camera';


const initialState: TCamerasData = {
  cameras: [],
  hasError: false,
  isDataLoading: false,
  shownItems: [],
  modalInfo: undefined,
  purchaseModalStatus: false,
  formModalStatus: false,
  successModalStatus: false,
};

export const camerasData = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {
    sortShownItems: (state , action: PayloadAction<number[]>) => {
      state.shownItems = [...state.cameras.slice(action.payload[0] , action.payload[1])];
    },
    setModalInfo: (state, action: PayloadAction<TCamera>) => {
      state.modalInfo = action.payload;
    },
    setPurchaseModalStatus: (state, action: PayloadAction<boolean>) => {
      state.formModalStatus = false;
      state.purchaseModalStatus = action.payload;
    },
    setFormModalStatus: (state, action: PayloadAction<boolean>) => {
      state.purchaseModalStatus = false;
      state.formModalStatus = action.payload;
    },
    setSuccessModalStatus: (state, action: PayloadAction<boolean>) => {
      state.successModalStatus = action.payload;
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
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.isDataLoading = false;
        state.hasError = true;
      });
  }
});

export const {sortShownItems, setModalInfo, setPurchaseModalStatus, setFormModalStatus, setSuccessModalStatus} = camerasData.actions;
