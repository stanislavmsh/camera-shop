import { makeFakePromos } from '../../utils/mocks';
import { fetchPromoAction } from './promo-data.action';
import { promoData } from './promo-data.slice';

describe('Promos data slice' , () => {

  const initialState = {
    promos: [],
    hasError: false,
  };

  const mockPromos = makeFakePromos();


  it('should return initial state with empty action' , () => {
    const emptyAction = { type: '' };

    const result = promoData.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should retun default initial state with empty action' , () => {
    const emptyAction = { type: '' };

    const result = promoData.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);

  });

  describe('fetchPromoAction slice' , () => {


    it('should set currentInfo to object with data , isDataLoading to false with "fetchPromoAction.fullfilled"', () => {
      const expectedState = {
        ...initialState,
        promos: mockPromos
      };

      const result = promoData.reducer(undefined, fetchPromoAction.fulfilled(mockPromos, '', undefined));

      expect(result).toEqual(expectedState);
    });

    it('should set isData loading to false, "hasError" to true with "fetchCurrentAction.rejected"', () => {
      const expectedState = {
        ...initialState,
        hasError: true,
      };

      const result = promoData.reducer(undefined , fetchPromoAction.rejected);

      expect(result).toEqual(expectedState);

    });
  });


});
