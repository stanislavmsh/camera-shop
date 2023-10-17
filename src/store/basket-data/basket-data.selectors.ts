import { TCamera } from '../../types/camera';
import { State } from '../../types/state';
import { NameSpace } from '../../utils/const';


export const getBasketItems = (state: State): TCamera[] => state[NameSpace.Basket].items;
export const getCurrentBasketItem = (state: State) : TCamera | undefined => state[NameSpace.Basket].currentItem;
export const getChangedBasketItems = (state: State): TCamera[] => state[NameSpace.Basket].changedItems;
