import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../utils/const';
import { promoData } from './promo-data/promo-data.slice';
import { camerasData } from './cameras-data/cameras-data.slice';


export const rootReducer = combineReducers({
  [NameSpace.Promo]: promoData.reducer,
  [NameSpace.Cameras]: camerasData.reducer,
});
