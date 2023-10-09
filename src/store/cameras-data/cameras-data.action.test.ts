import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { State } from '../../types/state';
import { AppThunkDispatch , extractActionsTypes, makeFakeCamerasData} from '../../utils/mocks';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { APIRoute } from '../../utils/const';
import { fetchCamerasAction, fetchCamerasByPriceAction } from './cameras-data.action';


describe('Cameras Data async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStore = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStore>;


  beforeEach(() => {
    store = mockStore({CAMERAS: {cameras: []}});
  });

  describe('fetchCamerasAction', () => {
    it('should dispatch "fetchCamerasAction.pending", "fetchCamerasAction.fullfilled" when server response 200', async () => {
      const mockCameras = makeFakeCamerasData();
      mockAxiosAdapter.onGet(APIRoute.Cameras).reply(200, mockCameras);

      await store.dispatch(fetchCamerasAction());

      const emmitedAction = store.getActions();
      const extractedActionsTypes = extractActionsTypes(store.getActions());
      const fetchCamerasActionFullfilled = emmitedAction.at(1) as ReturnType<typeof fetchCamerasAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchCamerasAction.pending.type,
        fetchCamerasAction.fulfilled.type,
      ]);

      expect(fetchCamerasActionFullfilled.payload).toEqual(mockCameras);

    });

    it('should dispatch "fetchCamerasAction.pending", "fetchCamerasAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Cameras).reply(400, []);

      await store.dispatch(fetchCamerasAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCamerasAction.pending.type,
        fetchCamerasAction.rejected.type

      ]);

    });


  });
  describe('fetchCamerasByPriceAction', () => {
    it('should dispatch "fetchCamerasByPriceAction.pending", "fetchCamerasByPriceAction.fullfilled" when server response 200', async () => {
      const mockCameraData = makeFakeCamerasData();
      const actionPayload: [number, number] = [1990, 5000];
      mockAxiosAdapter.onGet(`${APIRoute.Cameras}?price_gte=${actionPayload[0]}&price_lte=${actionPayload[1]}`).reply(200, mockCameraData);

      await store.dispatch(fetchCamerasByPriceAction(actionPayload));

      const emmitedAction = store.getActions();
      const extractedActionsTypes = extractActionsTypes(store.getActions());
      const fetchCamerasByPriceActionFullfilled = emmitedAction.at(1) as ReturnType<typeof fetchCamerasByPriceAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchCamerasByPriceAction.pending.type,
        fetchCamerasByPriceAction.fulfilled.type
      ]);

      expect(fetchCamerasByPriceActionFullfilled.payload).toEqual(mockCameraData);

    });

    it('should dispatch "fetchCamerasByPriceAction.pending", "fetchCamerasByPriceAction.rejected" when server response 400', async () => {
      const actionPayload: [number, number] = [-1990, -5000];
      mockAxiosAdapter.onGet(`${APIRoute.Cameras}?price_gte=${actionPayload[0]}&price_lte=${actionPayload[1]}`).reply(400, []);

      await store.dispatch(fetchCamerasByPriceAction(actionPayload));
      const actions = extractActionsTypes(store.getActions());


      expect(actions).toEqual([
        fetchCamerasByPriceAction.pending.type,
        fetchCamerasByPriceAction.rejected.type

      ]);
    });
  });

});
