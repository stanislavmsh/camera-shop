import { render , screen} from '@testing-library/react';
import SimilarOffers from './similar-offers';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeCamerasData, makeFakeComments, makeFakeCurrentCameraData } from '../../utils/mocks';

const mockCurrentData = makeFakeCurrentCameraData();
const mockSimilarData = makeFakeCamerasData();
const mockComments = makeFakeComments();

describe('Component: Similar Offers', () => {
  it('should render component', () => {

    const { withStoreComponent } = withStore(<SimilarOffers />, {
      CURRENT: {
        currentInfo: mockCurrentData,
        hasError: false,
        isDataLoading: false,
        similarCameras: mockSimilarData,
        reviews: mockComments
      }
    });

    const prepComponent = withHistory(withStoreComponent);

    render(prepComponent);

    const element = screen.getByTestId('product-similar-test');

    expect(element).toBeInTheDocument();
  });
});
