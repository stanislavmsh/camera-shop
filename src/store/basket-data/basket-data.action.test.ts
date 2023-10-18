import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { State } from '../../types/state';
import { AppThunkDispatch , extractActionsTypes} from '../../utils/mocks';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { APIRoute } from '../../utils/const';
import { fetchCouponAction, sendOrderAction } from './basket-data.action';
import { TOrder } from '../../types/order';
import { resetBasket } from './basket-data.slice';
import { setActiveStatus, setOrderSuccessModalStatus } from '../modal-process/modal-process.slice';


describe('Cameras Data async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStore = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStore>;


  beforeEach(() => {
    store = mockStore({BASKET: {
      items: [],
      currentItem: undefined,
      changedItems: [],
      couponName: null,
      couponValue: 0,
      isCouponInvalid: false,
      isCouponValid: false,
    }});
  });

  describe('fetchCouponAction', () => {
    it('should dispatch "fetchCouponAction.pending", "fetchCouponAction.fullfilled" when server response 200', async () => {
      const actionPayload = 'cameras-111';
      const mockServerReply = 5;
      const mockReturnedData = {data: mockServerReply, value: actionPayload};
      mockAxiosAdapter.onPost(APIRoute.Coupons).reply(200, mockServerReply);

      await store.dispatch(fetchCouponAction(actionPayload));

      const emmitedAction = store.getActions();
      const extractedActionsTypes = extractActionsTypes(store.getActions());
      const fetchCouponActionFullfilled = emmitedAction.at(1) as ReturnType<typeof fetchCouponAction.fulfilled>;

      expect(fetchCouponActionFullfilled.payload).toEqual(mockReturnedData);
      expect(extractedActionsTypes).toEqual([
        fetchCouponAction.pending.type,
        fetchCouponAction.fulfilled.type
      ]);

    });
    it('should dispatch "fetchCouponAction.pending", "fetchCouponAction.rejected" when server response 400', async () => {
      const actionPayload = 'camera-12';
      mockAxiosAdapter.onPost(APIRoute.Coupons).reply(400, []);

      await store.dispatch(fetchCouponAction(actionPayload));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCouponAction.pending.type,
        fetchCouponAction.rejected.type
      ]);
    });

  });

  describe('sendOrderAction', () => {
    it('should dispatch "sendOrderAction.pending", "sendOrderAction.fullfilled" when server response 200', async () => {
      const actionPayload: TOrder = {
        camerasIds: [1 , 2 , 3],
        coupon: 'test-1'
      };
      mockAxiosAdapter.onPost(APIRoute.Orders).reply(200, []);
      await store.dispatch(sendOrderAction(actionPayload));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        sendOrderAction.pending.type,
        resetBasket.type,
        setActiveStatus.type,
        setOrderSuccessModalStatus.type,
        sendOrderAction.fulfilled.type
      ]);
    });
    it('should dispatch "sendOrderAction.pending", "sendOrderAction.rejected" when server response 200', async () => {
      const actionPayload: TOrder = {
        camerasIds: [1 , 2 , 3],
        coupon: 'test-1'
      };
      mockAxiosAdapter.onPost(APIRoute.Orders).reply(400, []);
      await store.dispatch(sendOrderAction(actionPayload));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        sendOrderAction.pending.type,
        sendOrderAction.rejected.type
      ]);
    });
  });

});
