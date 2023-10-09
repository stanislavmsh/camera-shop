
import { TCamerasData } from '../../types/state';
import { makeFakeCamerasData } from '../../utils/mocks';
import { fetchCamerasAction, fetchCamerasByPriceAction } from './cameras-data.action';
import { camerasData, sortShownItems } from './cameras-data.slice';

describe('Cameras Data Slice' , () => {

  const initialState : TCamerasData = {
    cameras: [],
    filteredCameras: [],
    storedItems: [],
    backupCameras: [],
    hasError: false,
    isDataLoading: false,
    shownItems: [],
    firstItem: 1,
    lastItem: 9,
    isDataByPriceLoading: false,
    priceMinMax: ['', '']
  };

  it('should return initial state with empty action' , () => {
    const emptyAction = { type: '' };
    const expectedState = {...initialState};

    const result = camerasData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should retun default initial state with empty action' , () => {
    const emptyAction = { type: '' };
    const expectedState = {...initialState};

    const result = camerasData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);

  });

  it('should slice cameras to get shownItems', () => {
    const actionPayload = [0 , 4];
    const mockCameraData = makeFakeCamerasData();
    const expectedShowIntems = mockCameraData.slice(actionPayload[0], actionPayload[1]);
    const state = {
      ...initialState,
      cameras: mockCameraData,
      filteredCameras: mockCameraData,

    };

    const expectedState = {
      ...initialState,
      cameras: mockCameraData,
      filteredCameras: mockCameraData,
      shownItems: expectedShowIntems,
      firstItem: 0,
      lastItem: 4,
    };

    const result = camerasData.reducer(state, sortShownItems(actionPayload));

    expect(result).toEqual(expectedState);

  });

  it('should set "isDataLoading" to true with fetchCamerasAction.pending', () => {
    const expectedState = {...initialState , isDataLoading: true};

    const result = camerasData.reducer(undefined, fetchCamerasAction.pending);

    expect(result).toEqual(expectedState);

  });

  it('should set "isDataByPriceLoading" to true with fetchCamerasByPriceAction.pending', () => {
    const expectedState = {...initialState, isDataByPriceLoading: true};

    const result = camerasData.reducer(undefined, fetchCamerasByPriceAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "cameras" and sortedCameras to arrays with cameras data , isDataLoading to false with "fetchCamerasAction.fullfilled"', () => {

    const mockCameraData = makeFakeCamerasData();
    const expectedState = {
      ...initialState,
      cameras: mockCameraData,
      filteredCameras: mockCameraData,
      isDataLoading: false,
      storedItems: mockCameraData,
      backupCameras: mockCameraData,
    };

    const result = camerasData.reducer(undefined, fetchCamerasAction.fulfilled(mockCameraData, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "isDataByPriceLoading" to false and fill cameras and filteredCameras with new array with fetchCamerasByPriceAction.fullfilled', () => {
    const mockNewCameraData = makeFakeCamerasData();
    const actionPayload : [number, number] = [1990, 50000];
    const expectedState = {
      ...initialState,
      isDataByPriceLoading: false,
      cameras: mockNewCameraData,
      filteredCameras: mockNewCameraData
    };

    const result = camerasData.reducer(undefined, fetchCamerasByPriceAction.fulfilled(mockNewCameraData, '', actionPayload));

    expect(result).toEqual(expectedState);
  });

  it('should set "isDataLoading" to false , "hasError" to true with "fetchCamerasAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      hasError: true,
      isDataLoading: false,
    };

    const result = camerasData.reducer(undefined, fetchCamerasAction.rejected);
    expect(result).toEqual(expectedState);
  });


});
