import { makeFakeCamerasData, makeFakeComments, makeFakeCurrentCameraData } from '../../utils/mocks';
import ModalComponent from './modal-component';
import { withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';

const mockCurrentData = makeFakeCurrentCameraData();
const mockSimilarData = makeFakeCamerasData();
const mockComments = makeFakeComments();

describe('Component: Modal Component' , () => {
  it('should render ReviewForm when any modal status is true', () => {
    const { withStoreComponent } = withStore(<ModalComponent />, {
      CURRENT: {
        currentInfo: mockCurrentData,
        hasError: false,
        isDataLoading: false,
        similarCameras: mockSimilarData,
        reviews: mockComments,
      },
      CAMERAS: {
        cameras:[],
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
      },
      MODAL: {
        modalInfo: mockCurrentData,
        purchaseModalStatus: false,
        basketModalStatus: false,
        formModalStatus: false,
        successModalStatus: false,
        removalModalStatus: false,
        orderSuccessModalStatus: false,
        isActive: true,
      },
    });

    render(withStoreComponent);

    const element = screen.getByTestId('modal-test');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('is-active');

  });

  it('should not render ReviewForm when modal status is false', () => {
    const { withStoreComponent } = withStore(<ModalComponent />, {
      CURRENT: {
        currentInfo: mockCurrentData,
        hasError: false,
        isDataLoading: false,
        similarCameras: mockSimilarData,
        reviews: mockComments
      },
      CAMERAS: {
        cameras:[],
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
      },
      MODAL: {
        modalInfo: undefined,
        purchaseModalStatus: false,
        basketModalStatus: false,
        formModalStatus: false,
        successModalStatus: false,
        removalModalStatus: false,
        orderSuccessModalStatus: false,
        isActive: false,
      },
    });

    render(withStoreComponent);

    const element = screen.getByTestId('modal-test');
    expect(element).toBeInTheDocument();
    expect(element).not.toHaveClass('is-active');

  });
});
