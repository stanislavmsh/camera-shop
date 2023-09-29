import { State } from '../../types/state';
import { TCamera } from '../../types/camera';
import { NameSpace } from '../../utils/const';

export const getModalInfo = (state: State): TCamera | undefined => state[NameSpace.Modal].modalInfo;
export const getPurchaseModalStatus = (state: State) : boolean => state[NameSpace.Modal].purchaseModalStatus;
export const getFormModalStatus = (state: State) : boolean => state[NameSpace.Modal].formModalStatus;
export const getSuccessModalStatus = (state: State) : boolean => state[NameSpace.Modal].successModalStatus;
