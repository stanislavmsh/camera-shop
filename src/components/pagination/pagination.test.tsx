import { render , screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeCamerasData } from '../../utils/mocks';
import MemoizedPagination from './pagination';

const mockCameraData = makeFakeCamerasData();
const mockShownData = mockCameraData.slice(0, 4);


describe('Component: Pagination' , () => {
  it('should render component', () => {
    const { withStoreComponent } = withStore(<MemoizedPagination />, {
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

    const element = screen.getByTestId('pagination-test');
    expect(element).toBeInTheDocument();
  });
});
