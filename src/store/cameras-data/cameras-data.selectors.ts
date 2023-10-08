import { TCamera } from '../../types/camera';
import { State } from '../../types/state';
import { NameSpace } from '../../utils/const';


export const getCameras = (state: State): TCamera[] => state[NameSpace.Cameras].cameras;
export const getLoadingStatus = (state: State): boolean => state[NameSpace.Cameras].isDataLoading;
export const getShownItems = (state: State): TCamera[] => state[NameSpace.Cameras].shownItems;
export const getFilteredCameras = (state: State) : TCamera[] => state[NameSpace.Cameras].filteredCameras;

export const getBackupCameras = (state: State) : TCamera[] => state[NameSpace.Cameras].backupCameras;
export const getStoredItems = (state: State) : TCamera[] => state[NameSpace.Cameras].storedItems;
export const getPriceMinMax = (state: State) : [string, string] => state[NameSpace.Cameras].priceMinMax;
export const getDataByPriceStatus = (state: State) : boolean => state[NameSpace.Cameras].isDataByPriceLoading;
