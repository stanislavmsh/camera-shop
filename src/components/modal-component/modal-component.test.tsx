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
        cameras: [],
        sortedCameras: [],
        hasError: false,
        isDataLoading: false,
        shownItems: [],
        firstItem: 1,
        lastItem: 9,
      },
      MODAL: {
        modalInfo: undefined,
        purchaseModalStatus: false,
        formModalStatus: false,
        successModalStatus: true,
        isActive: true,
      }
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
        cameras: [],
        sortedCameras: [],
        hasError: false,
        isDataLoading: false,
        shownItems: [],
        firstItem: 1,
        lastItem: 9,
      },
      MODAL: {
        modalInfo: undefined,
        purchaseModalStatus: false,
        formModalStatus: false,
        successModalStatus: false,
        isActive: false,
      }
    });

    render(withStoreComponent);

    const element = screen.getByTestId('modal-test');
    expect(element).toBeInTheDocument();
    expect(element).not.toHaveClass('is-active');

  });
});
