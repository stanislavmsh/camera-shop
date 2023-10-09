
import { FilterPayloadAction, TCamerasData } from '../../types/state';
import { FilterCategory, SortingOption, SortingValues } from '../../utils/const';
import { makeFakeCamerasData } from '../../utils/mocks';
import { fetchCamerasAction, fetchCamerasByPriceAction } from './cameras-data.action';
import { camerasData, filterCameras, resetCameras, setPriceMinMax, sortCatalog, sortShownItems } from './cameras-data.slice';

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

  it('should sort catalog and set new shown items based on new filteredCameras' , () => {
    const actionPayload : [SortingOption, SortingValues] = [SortingOption.LowToHigh , SortingValues.Price];
    const mockCameraData = makeFakeCamerasData();
    const expectedFilteredCameras = mockCameraData.sort((a, b) => a.price - b.price);
    const expectedShownItems = [...expectedFilteredCameras.slice(initialState.firstItem, initialState.lastItem)];
    const state = {
      ...initialState,
      filteredCameras: mockCameraData
    };
    const expectedState = {
      ...initialState,
      filteredCameras: expectedFilteredCameras,
      shownItems: expectedShownItems,
    };

    const result = camerasData.reducer(state, sortCatalog(actionPayload));

    expect(result).toEqual(expectedState);

  });

  it('should filter cameras and backup cameras and put result into filteredCameras and storedItems', () => {
    const actionPayload: FilterPayloadAction = [FilterCategory.Photo, [] , []];
    const mockCameraData = makeFakeCamerasData();
    const expectedFilteredData = [...mockCameraData.filter((elem) => elem.category === actionPayload[0] || elem.category === 'Фотоаппарат')];
    const state = {
      ...initialState,
      cameras: mockCameraData,
      backupCameras: mockCameraData,
    };
    const expectedState = {
      ...initialState,
      cameras: mockCameraData,
      backupCameras: mockCameraData,
      filteredCameras: expectedFilteredData,
      storedItems: expectedFilteredData,
    };

    const result = camerasData.reducer(state, filterCameras(actionPayload));

    expect(result).toEqual(expectedState);
  });

  it('should store max and min price in priceMinMax', () => {
    const actionPayload: [string, string] = ['1990', '50000'];
    const state = {
      ...initialState
    };
    const expectedState = {
      ...initialState,
      priceMinMax: actionPayload
    };

    const result = camerasData.reducer(state, setPriceMinMax(actionPayload));

    expect(result).toEqual(expectedState);
  });

  it('should reset cameras from backupCameras', () => {
    const mockCameraData = makeFakeCamerasData();
    const state = {
      ...initialState,
      cameras: mockCameraData.slice(0, 2),
      backupCameras: mockCameraData,
    };
    const expectedState = {
      ...initialState,
      cameras: mockCameraData,
      backupCameras: mockCameraData
    };

    const result = camerasData.reducer(state, resetCameras());

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
