import { makeFakeCamerasData } from '../../utils/mocks';
import { modalProcess, setActiveStatus, setBasketModalStatus, setFormModalStatus, setModalInfo, setOrderSuccessModalStatus, setPurchaseModalStatus, setRemovalModalStatus, setSuccessModalStatus } from './modal-process.slice';

const initialState = {
  modalInfo: undefined,
  purchaseModalStatus: false,
  basketModalStatus: false,
  formModalStatus: false,
  successModalStatus: false,
  removalModalStatus: false,
  orderSuccessModalStatus: false,
  isActive: false,
};


it('should set modalInfo with data', () => {
  const mockCameraData = makeFakeCamerasData();
  const actionPayload = mockCameraData[0];
  const state = {...initialState};
  const expectedState = {...initialState, modalInfo: mockCameraData[0]};

  const result = modalProcess.reducer(state, setModalInfo(actionPayload));

  expect(result).toEqual(expectedState);
});

it('should set purchaseModalStatus', () => {
  const actionPayload = true;
  const state = {...initialState};
  const expectedState = {...initialState, purchaseModalStatus: true};

  const result = modalProcess.reducer(state, setPurchaseModalStatus(actionPayload));

  expect(result).toEqual(expectedState);
});
it('should set basketModalStatus', () => {
  const actionPayload = true;
  const state = {...initialState};
  const expectedState = {...initialState, basketModalStatus: true};

  const result = modalProcess.reducer(state, setBasketModalStatus(actionPayload));

  expect(result).toEqual(expectedState);
});
it('should set formModalStatus', () => {
  const actionPayload = true;
  const state = {...initialState};
  const expectedState = {...initialState, formModalStatus: true};

  const result = modalProcess.reducer(state, setFormModalStatus(actionPayload));

  expect(result).toEqual(expectedState);
});
it('should set successModalStatus', () => {
  const actionPayload = true;
  const state = {...initialState};
  const expectedState = {...initialState, successModalStatus: true};

  const result = modalProcess.reducer(state, setSuccessModalStatus(actionPayload));

  expect(result).toEqual(expectedState);
});
it('should set removalModalStatus', () => {
  const actionPayload = true;
  const state = {...initialState};
  const expectedState = {...initialState, removalModalStatus: true};

  const result = modalProcess.reducer(state, setRemovalModalStatus(actionPayload));

  expect(result).toEqual(expectedState);
});
it('should set orderSuccessModalStatus', () => {
  const actionPayload = true;
  const state = {...initialState};
  const expectedState = {...initialState, orderSuccessModalStatus: true};

  const result = modalProcess.reducer(state, setOrderSuccessModalStatus(actionPayload));

  expect(result).toEqual(expectedState);
});
it('should set isActive', () => {
  const actionPayload = true;
  const state = {...initialState};
  const expectedState = {...initialState, isActive: true};

  const result = modalProcess.reducer(state, setActiveStatus(actionPayload));

  expect(result).toEqual(expectedState);
});
