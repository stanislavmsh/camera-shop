import { NameSpace } from '../../utils/const';
import { TBasketData } from '../../types/state';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TCamera } from '../../types/camera';
import { STORAGE_NAME } from '../../utils/const';

const initialState: TBasketData = {
  items: JSON.parse(localStorage.getItem(STORAGE_NAME) || '[]') as TCamera[],
  currentItem: undefined,
};

export const basketData = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addItemToBasket: (state, action : PayloadAction<TCamera>) => {
      state.items.push(action.payload);
    },
    setItemToDelete: (state, action: PayloadAction<TCamera>) => {
      state.currentItem = action.payload;
    },
    removeItem: (state) => {
      state.items = state.items.filter((item) => item.id !== state.currentItem?.id);
      localStorage.setItem(STORAGE_NAME, JSON.stringify(state.items));
    }
  },
});

export const { addItemToBasket , setItemToDelete, removeItem} = basketData.actions;
