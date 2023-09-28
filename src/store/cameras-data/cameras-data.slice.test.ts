
import { makeFakeCamerasData } from '../../utils/mocks';
import { fetchCamerasAction } from './cameras-data.action';
import { camerasData, setModalInfo, setPurchaseModalStatus, sortShownItems } from './cameras-data.slice';

describe('Cameras Data Slice' , () => {

  const initialState = {
    cameras: [],
    hasError: false,
    isDataLoading: false,
    shownItems: [],
    modalInfo: undefined,
    purchaseModalStatus: false,
    formModalStatus: false,
    successModalStatus: false,
  };

  it('should return initial state with empty action' , () => {
    const emptyAction = { type: '' };
    const expectedState = {...initialState };

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
    };

    const expectedState = {
      ...initialState,
      cameras: mockCameraData,
      shownItems: expectedShowIntems,
    };

    const result = camerasData.reducer(state, sortShownItems(actionPayload));

    expect(result).toEqual(expectedState);

  });

  it('should set modalInfo with data', () => {
    const mockCameraData = makeFakeCamerasData();
    const actionPayload = mockCameraData[0];
    const state = {...initialState};
    const expectedState = {...initialState, modalInfo: mockCameraData[0]};

    const result = camerasData.reducer(state, setModalInfo(actionPayload));

    expect(result).toEqual(expectedState);
  });

  it('should set purchaseModalStatus', () => {
    const actionPayload = true;
    const state = {...initialState};
    const expectedState = {...initialState, purchaseModalStatus: true};

    const result = camerasData.reducer(state, setPurchaseModalStatus(actionPayload));

    expect(result).toEqual(expectedState);
  });

  it('should set "isDataLoading" to true with fetchCamerasAction.pending', () => {
    const expectedState = {...initialState , isDataLoading: true};

    const result = camerasData.reducer(undefined, fetchCamerasAction.pending);

    expect(result).toEqual(expectedState);

  });

  it('should set "cameras" to array with cameras data , isDataLoading to false with "fetchCamerasAction.fullfilled"', () => {

    const mockCameraData = makeFakeCamerasData();
    const expectedState = {
      ...initialState,
      cameras: mockCameraData,
      isDataLoading: false,
    };

    const result = camerasData.reducer(undefined, fetchCamerasAction.fulfilled(mockCameraData, '', undefined));

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
