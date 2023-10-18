import { makeFakeCamerasData } from '../../utils/mocks';
import { modalProcess, setModalInfo, setPurchaseModalStatus } from './modal-process.slice';

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
