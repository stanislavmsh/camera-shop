import { NameSpace } from '../../utils/const';
import { TModalProcess } from '../../types/state';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TCamera } from '../../types/camera';
import { resetModalStatus } from '../../utils/utils';

const initialState: TModalProcess = {
  modalInfo: undefined,
  purchaseModalStatus: false,
  basketModalStatus: false,
  formModalStatus: false,
  successModalStatus: false,
  removalModalStatus: false,
  orderSuccessModalStatus: false,
  isActive: false,
};

export const modalProcess = createSlice({
  name: NameSpace.Modal,
  initialState,
  reducers: {
    setModalInfo: (state, action: PayloadAction<TCamera>) => {
      state.modalInfo = action.payload;
    },
    setPurchaseModalStatus: (state, action: PayloadAction<boolean>) => {
      resetModalStatus(state);
      state.purchaseModalStatus = action.payload;
    },
    setFormModalStatus: (state, action: PayloadAction<boolean>) => {
      resetModalStatus(state);
      state.formModalStatus = action.payload;
    },
    setSuccessModalStatus: (state, action: PayloadAction<boolean>) => {
      resetModalStatus(state);
      state.successModalStatus = action.payload;
    },
    setBasketModalStatus: (state, action: PayloadAction<boolean>) => {
      resetModalStatus(state);
      state.basketModalStatus = action.payload;
    },
    setRemovalModalStatus: (state , action: PayloadAction<boolean>) => {
      resetModalStatus(state);
      state.removalModalStatus = action.payload;
    },
    setOrderSuccessModalStatus: (state, action: PayloadAction<boolean>) => {
      resetModalStatus(state);
      state.orderSuccessModalStatus = action.payload;
    },
    setActiveStatus: (state , action:PayloadAction<boolean>) => {
      state.isActive = action.payload;
    }
  },
});

export const {setModalInfo, setPurchaseModalStatus, setFormModalStatus, setSuccessModalStatus, setBasketModalStatus, setRemovalModalStatus , setActiveStatus, setOrderSuccessModalStatus} = modalProcess.actions;
