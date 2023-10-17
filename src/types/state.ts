import { store } from '../store';
import { FilterCategory, FilterType, FilterLevel } from '../utils/const';
import { TCamera } from './camera';
import { TPromo } from './promo';
import { TReview } from './review';

export type TPromoData = {
  promos: TPromo[];
  hasError: boolean;
}

export type FilterPayloadAction = [FilterCategory | null, FilterType[], FilterLevel[]]

export type TCamerasData = {
  cameras: TCamera[];
  filteredCameras: TCamera[];
  storedItems: TCamera[];
  backupCameras: TCamera[];
  hasError: boolean;
  isDataLoading: boolean;
  shownItems: TCamera[];
  firstItem: number;
  lastItem: number;
  isDataByPriceLoading: boolean;
  priceMinMax: [string, string];
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
  basketModalStatus: boolean;
  formModalStatus: boolean;
  successModalStatus: boolean;
  removalModalStatus: boolean;
  isActive: boolean;
}

export type TBasketData = {
  items: TCamera[];
  currentItem: TCamera | undefined;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
