import { makeFakeCamerasData } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import MemoizedCards from './cards';


const mockCameraData = makeFakeCamerasData();
const mockShownData = mockCameraData.slice(0, 3);

describe('Component: Card', () => {

  it('renders card component with data' , () => {

    const { withStoreComponent } = withStore(<MemoizedCards />, {
      CAMERAS: {
        cameras: mockCameraData,
        filteredCameras: mockCameraData,
        storedItems: mockCameraData,
        backupCameras: mockCameraData,
        hasError: false,
        isDataLoading: false,
        shownItems: mockShownData,
        firstItem: 1,
        lastItem: 9,
        isDataByPriceLoading: false,
        priceMinMax: ['', '']
      }
    });

    const prepComponent = withHistory(withStoreComponent);

    render(prepComponent);

    expect(screen.getByTestId('cards-test')).toBeInTheDocument();
  });

});
