import { TCamera } from '../../types/camera';
import { TBasketData } from '../../types/state';
import { makeFakeCamerasData } from '../../utils/mocks';
import { fetchCouponAction } from './basket-data.action';
import { addItemToBasket, basketData, changeItems, removeItem, resetBasket, setItemToDelete } from './basket-data.slice';


describe('Basket slice ', () => {
  const initialState: TBasketData = {
    items: [],
    currentItem: undefined,
    changedItems: [],
    couponName: null,
    couponValue: 0,
    isCouponInvalid: false,
    isCouponValid: false,
  };

  const mockCameraData = makeFakeCamerasData();


  it('should return initial state with empty action' , () => {
    const emptyAction = { type: '' };

    const result = basketData.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should retun default initial state with empty action' , () => {
    const emptyAction = { type: '' };

    const result = basketData.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);

  });

  it('should add new array element to "items" and "changedItems"', () => {
    const actionPayload = mockCameraData[0];
    const expectedState = {...initialState , items: [mockCameraData[0]], changedItems: [mockCameraData[0]]};

    const result = basketData.reducer(initialState, addItemToBasket(actionPayload));

    expect(result).toEqual(expectedState);
  });
  it('should add new array element to "items" and "changedItems"', () => {
    const actionPayload = mockCameraData[0];
    const expectedState = {...initialState , currentItem: mockCameraData[0]};

    const result = basketData.reducer(initialState, setItemToDelete(actionPayload));

    expect(result).toEqual(expectedState);
  });
  it('should remove items with currentItem', () => {
    const state = {...initialState, currentItem: mockCameraData[0], items: mockCameraData, changedItems: mockCameraData};
    const expectedMock = mockCameraData.filter((item) => item.id !== mockCameraData[0].id);
    const expectedState = {...state, items: expectedMock, changedItems: expectedMock};

    const result = basketData.reducer(state, removeItem());

    expect(result).toEqual(expectedState);

  });
  it('should put neccessary amount of similar components in array', () => {
    const actionPayload: [number, number] = [mockCameraData[4].id, 5];
    const state = {...initialState, items: mockCameraData, changedItems: mockCameraData};
    const itemToCopy = state.changedItems.find((elem) => elem.id === actionPayload[0]);
    const arrayOfCopies = Array.from({length: actionPayload[1]}, () => itemToCopy) as TCamera[];

    const mockToFill = [...state.changedItems.filter((item) => item.id !== actionPayload[0])];
    const expectedMock = mockToFill.concat(arrayOfCopies);
    const expectedState = {...initialState, items: mockCameraData, changedItems: expectedMock};

    const result = basketData.reducer(state, changeItems(actionPayload));

    expect(result).toEqual(expectedState);

  });
  it('should reset basket state ', () => {
    const state = {...initialState, couponValue: 231, couponName: 'abc', isCouponValid: true};

    const result = basketData.reducer(state , resetBasket());

    expect(result).toEqual(initialState);

  });

  it('should set couponValue and couponName with info, and also set isCouponValid to true with fetchCouponAction.fullfilled', () => {
    const mockValue = 5;
    const mockName = 'camera-131';
    const expectedState = {
      ...initialState,
      couponName: mockName,
      isCouponValid: true,
      couponValue: mockValue
    };

    const result = basketData.reducer(initialState, fetchCouponAction.fulfilled({data: mockValue, value :mockName}, '', mockName));
    expect(result).toEqual(expectedState);
  });

  it('should reset isCouponValid and isCouponInvalid with fetchCouponAction.pending', () => {
    const state = {...initialState, isCouponInvalid: false, isCouponValid: true};

    const result = basketData.reducer(state, fetchCouponAction.pending);

    expect(result).toEqual(initialState);

  });

  it('should set isCouponInvalid to true, isCouponValid to false and couponValue to 0', () => {
    const state = {...initialState, couponValue: 213, isCouponValid: true, isCouponInvalid: false};
    const expectedState = {...initialState, couponValue: 0, isCouponValid: false, isCouponInvalid: true};

    const result = basketData.reducer(state, fetchCouponAction.rejected);

    expect(result).toEqual(expectedState);
  });
});
