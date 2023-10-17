import { NameSpace } from '../../utils/const';
import { TBasketData } from '../../types/state';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TCamera } from '../../types/camera';
import { STORAGE_NAME } from '../../utils/const';

const initialState: TBasketData = {
  items: JSON.parse(localStorage.getItem(STORAGE_NAME) || '[]') as TCamera[],
  currentItem: undefined,
  changedItems: JSON.parse(localStorage.getItem(STORAGE_NAME) || '[]') as TCamera[],
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
      localStorage.setItem(STORAGE_NAME, JSON.stringify(state.items));
    },
    changeItems: (state , action: PayloadAction<[number, number]>) => {
      const [id , count] = action.payload;
      const itemToCopy = state.changedItems.find((elem) => elem.id === id);
      const arrayOfCopies = Array.from({length: count}, () => itemToCopy) as TCamera[];
      state.changedItems = [...state.changedItems.filter((item) => item.id !== id)];
      state.changedItems = state.changedItems.concat(arrayOfCopies);
      localStorage.setItem(STORAGE_NAME, JSON.stringify(state.changedItems));
    }
  },
});

export const { addItemToBasket , setItemToDelete, removeItem , changeItems} = basketData.actions;
