import { NameSpace } from '../../utils/const';
import { TBasketData } from '../../types/state';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TCamera } from '../../types/camera';
import { StorageName } from '../../utils/const';
import { fetchCouponAction } from './basket-data.action';

const initialState: TBasketData = {
  items: JSON.parse(localStorage.getItem(StorageName.Camera) || '[]') as TCamera[],
  currentItem: undefined,
  changedItems: JSON.parse(localStorage.getItem(StorageName.Camera) || '[]') as TCamera[],
  couponName: null,
  couponValue: 0,
  isCouponInvalid: false,
  isCouponValid: false,
};

export const basketData = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addItemToBasket: (state, action : PayloadAction<TCamera>) => {
      state.items.push(action.payload);
      state.changedItems.push(action.payload);
    },
    setItemToDelete: (state, action: PayloadAction<TCamera>) => {
      state.currentItem = action.payload;
    },
    removeItem: (state) => {
      state.items = state.items.filter((item) => item.id !== state.currentItem?.id);
      state.changedItems = state.changedItems.filter((item) => item.id !== state.currentItem?.id);
      localStorage.setItem(StorageName.Camera, JSON.stringify(state.items));
    },
    changeItems: (state , action: PayloadAction<[number, number]>) => {
      const [id , count] = action.payload;
      const itemToCopy = state.changedItems.find((elem) => elem.id === id);
      const arrayOfCopies = Array.from({length: count}, () => itemToCopy) as TCamera[];
      state.changedItems = [...state.changedItems.filter((item) => item.id !== id)];
      state.changedItems = state.changedItems.concat(arrayOfCopies);
      localStorage.setItem(StorageName.Camera, JSON.stringify(state.changedItems));
    },
    resetBasket: (state) => {
      state.isCouponInvalid = false;
      state.isCouponValid = false;
      state.items = [];
      state.changedItems = [];
      state.currentItem = undefined;
      state.couponValue = 0;
      state.couponName = null;
      localStorage.removeItem(StorageName.Camera);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCouponAction.fulfilled , (state, action) => {
        state.couponValue = action.payload.data;
        state.couponName = action.payload.value;
        state.isCouponValid = true;
        state.isCouponInvalid = false;
      })
      .addCase(fetchCouponAction.pending, (state) => {
        state.isCouponInvalid = false;
        state.isCouponValid = false;
      })
      .addCase(fetchCouponAction.rejected, (state) => {
        state.isCouponInvalid = true;
        state.isCouponValid = false;
        state.couponValue = 0;
      });
  }
});

export const { addItemToBasket , setItemToDelete, removeItem , changeItems, resetBasket } = basketData.actions;
