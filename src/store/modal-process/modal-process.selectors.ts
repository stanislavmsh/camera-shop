import { State } from '../../types/state';
import { TCamera } from '../../types/camera';
import { NameSpace } from '../../utils/const';

export const getModalInfo = (state: State): TCamera | undefined => state[NameSpace.Modal].modalInfo;
export const getPurchaseModalStatus = (state: State) : boolean => state[NameSpace.Modal].purchaseModalStatus;
export const getFormModalStatus = (state: State) : boolean => state[NameSpace.Modal].formModalStatus;
export const getSuccessModalStatus = (state: State) : boolean => state[NameSpace.Modal].successModalStatus;
export const getActiveStatus = (state: State) : boolean => state[NameSpace.Modal].isActive;

export const getBasketModalStatus = (state: State) : boolean => state[NameSpace.Modal].basketModalStatus;
export const getRemovalModalStatus = (state: State) : boolean => state[NameSpace.Modal].removalModalStatus;
export const getOrderModalStatus = (state: State) : boolean => state[NameSpace.Modal].orderSuccessModalStatus;
