import { NameSpace } from '../../utils/const';
import { TModalProcess } from '../../types/state';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TCamera } from '../../types/camera';

const initialState: TModalProcess = {
  modalInfo: undefined,
  purchaseModalStatus: false,
  formModalStatus: false,
  successModalStatus: false,
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
      state.successModalStatus = false;
      state.formModalStatus = false;
      state.purchaseModalStatus = action.payload;
    },
    setFormModalStatus: (state, action: PayloadAction<boolean>) => {
      state.successModalStatus = false;
      state.purchaseModalStatus = false;
      state.formModalStatus = action.payload;
    },
    setSuccessModalStatus: (state, action: PayloadAction<boolean>) => {
      state.purchaseModalStatus = false;
      state.formModalStatus = false;
      state.successModalStatus = action.payload;
    },
    setActiveStatus: (state , action:PayloadAction<boolean>) => {
      state.isActive = action.payload;
    }
  },
});

export const {setModalInfo, setPurchaseModalStatus, setFormModalStatus, setSuccessModalStatus , setActiveStatus} = modalProcess.actions;
