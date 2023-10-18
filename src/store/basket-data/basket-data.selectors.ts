import { TCamera } from '../../types/camera';
import { State } from '../../types/state';
import { NameSpace } from '../../utils/const';


export const getBasketItems = (state: State): TCamera[] => state[NameSpace.Basket].items;
export const getCurrentBasketItem = (state: State) : TCamera | undefined => state[NameSpace.Basket].currentItem;
export const getChangedBasketItems = (state: State): TCamera[] => state[NameSpace.Basket].changedItems;
export const getCouponValue = (state: State): number => state[NameSpace.Basket].couponValue;
export const getIsCouponValid = (state: State): boolean => state[NameSpace.Basket].isCouponValid;
export const getIsCouponInvalid = (state: State): boolean => state[NameSpace.Basket].isCouponInvalid;
export const getCouponName = (state: State): string | null => state[NameSpace.Basket].couponName;
