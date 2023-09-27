import { TCamera } from '../../types/camera';
import { State } from '../../types/state';
import { NameSpace } from '../../utils/const';


export const getCameras = (state: State): TCamera[] => state[NameSpace.Cameras].cameras;
export const getLoadingStatus = (state: State): boolean => state[NameSpace.Cameras].isDataLoading;
export const getShownItems = (state: State): TCamera[] => state[NameSpace.Cameras].shownItems;
export const getModalInfo = (state: State): TCamera | undefined => state[NameSpace.Cameras].modalInfo;
export const getPurchaseModalStatus = (state: State) : boolean => state[NameSpace.Cameras].purchaseModalStatus;
