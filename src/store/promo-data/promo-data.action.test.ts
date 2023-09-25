import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { createAPI } from '../../services/api';
import { AppThunkDispatch, extractActionsTypes, makeFakePromos } from '../../utils/mocks';
import { State } from '../../types/state';
import { APIRoute } from '../../utils/const';
import { fetchPromoAction } from './promo-data.action';

describe('Promos async' , () => {

  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStore = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({PROMO: {
      promos: [],
    }});
  });

  describe('fetchPromoActions', () => {
    it('should dispatch "fetchPromoAction.pending", "fetchPromoAction.fullfilled" when server response 200', async () => {
      const mockPromos = makeFakePromos();
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(200, mockPromos);

      await store.dispatch(fetchPromoAction());

      const emmitedAction = store.getActions();
      const extractedActionsTypes = extractActionsTypes(store.getActions());
      const fetchCamerasActionFullfilled = emmitedAction.at(1) as ReturnType<typeof fetchPromoAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchPromoAction.pending.type,
        fetchPromoAction.fulfilled.type,
      ]);

      expect(fetchCamerasActionFullfilled.payload).toEqual(mockPromos);
    });

    it('should dispatch "fetchPromoAction.pending", "fetchPromoAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(400, []);

      await store.dispatch(fetchPromoAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchPromoAction.pending.type,
        fetchPromoAction.rejected.type

      ]);

    });


  });
});
