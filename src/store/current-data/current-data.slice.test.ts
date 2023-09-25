import { makeFakeCamerasData, makeFakeComments, makeFakeCurrentCameraData } from '../../utils/mocks';
import { fetchCurrentAction, fetchReviewsAction, fetchSimilarAction } from './current-data.action';
import { currentData } from './current-data.slice';

describe('Current Camera data slice' , () => {

  const initialState = {
    currentInfo : undefined,
    hasError: false,
    isDataLoading: false,
    similarCameras: [],
    reviews: [],
  };

  const mockCurrentCamera = makeFakeCurrentCameraData();
  const mockComments = makeFakeComments();
  const mockSimilars = makeFakeCamerasData();

  it('should return initial state with empty action' , () => {
    const emptyAction = { type: '' };

    const result = currentData.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should retun default initial state with empty action' , () => {
    const emptyAction = { type: '' };

    const result = currentData.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);

  });

  describe('fetchCurrentAction slice' , () => {

    it('should set "isDataLoading" to true with fetchCurrentAction.pending' , () => {
      const expectedState = {
        ...initialState,
        isDataLoading: true,
      };

      const result = currentData.reducer(undefined, fetchCurrentAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set currentInfo to object with data , isDataLoading to false with "fetchCurrentAction.fullfilled"', () => {
      const expectedState = {
        ...initialState,
        currentInfo: mockCurrentCamera
      };

      const result = currentData.reducer(undefined, fetchCurrentAction.fulfilled(mockCurrentCamera, '', mockCurrentCamera.id));

      expect(result).toEqual(expectedState);
    });

    it('should set isData loading to false, "hasError" to true with "fetchCurrentAction.rejected"', () => {
      const expectedState = {
        ...initialState,
        hasError: true,
      };

      const result = currentData.reducer(undefined , fetchCurrentAction.rejected);

      expect(result).toEqual(expectedState);

    });
  });

  describe('fetchReviewsAction slice', () => {
    it('should set reviews with data with "fetchCommentsAction.fullfilled"' , () => {
      const expectedState = {
        ...initialState,
        reviews: mockComments,
      };

      const result = currentData.reducer(undefined, fetchReviewsAction.fulfilled(mockComments, '', mockCurrentCamera.id));

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchSimilarAction slice', () => {
    it('should set similarCameras with data with "fetchSimilarsAction.fullfilled"', () => {
      const expectedState = {
        ...initialState,
        similarCameras: mockSimilars
      };

      const result = currentData.reducer(undefined, fetchSimilarAction.fulfilled(mockSimilars, '', mockCurrentCamera.id));

      expect(result).toEqual(expectedState);
    });
  });

});
