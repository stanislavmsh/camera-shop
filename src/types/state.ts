import { store } from '../store';
// import { SortingOption } from '../utils/const';
import { TCamera } from './camera';
import { TPromo } from './promo';
import { TReview } from './review';

export type TPromoData = {
  promos: TPromo[];
  hasError: boolean;
}

export type TCamerasData = {
  cameras: TCamera[];
  hasError: boolean;
  isDataLoading: boolean;
  shownItems: TCamera[];
  // sortingOrder: SortingOption;
  firstItem: number;
  lastItem: number;

}

export type TCurrentData = {
  currentInfo: TCamera | undefined;
  hasError: boolean;
  isDataLoading: boolean;
  similarCameras: TCamera[];
  reviews: TReview[];
}

export type TModalProcess = {
  modalInfo: TCamera | undefined;
  purchaseModalStatus: boolean;
  formModalStatus: boolean;
  successModalStatus: boolean;
  isActive: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
