import { withStore } from '../../utils/mock-component';
import { makeFakeCamerasData, makeFakeComments, makeFakeCurrentCameraData } from '../../utils/mocks';
import ReviewBlock from './review-block';
import {screen , render} from '@testing-library/react';

const mockCurrentData = makeFakeCurrentCameraData();
const mockSimilarData = makeFakeCamerasData();
const mockComments = makeFakeComments();

describe('Component: Review Block', () => {

  it('should render component' , () => {
    const { withStoreComponent } = withStore(<ReviewBlock />, {
      CURRENT: {
        currentInfo: mockCurrentData,
        hasError: false,
        isDataLoading: false,
        similarCameras: mockSimilarData,
        reviews: mockComments
      },
      CAMERAS: {
        cameras: [],
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

    const element = screen.getByTestId('review-block-test');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('review-block');

  });
});
