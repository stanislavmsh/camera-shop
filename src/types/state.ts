import { store } from '../store';
import { TCamera } from './camera';
import { TPromo } from './promo';

export type TPromoData = {
  promos: TPromo[];
  hasError: boolean;
}

export type TCamerasData = {
  cameras: TCamera[];
  hasError: boolean;
  isDataLoading: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
