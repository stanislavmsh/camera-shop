import { render, screen } from '@testing-library/react';
import CatalogFilterPrice from './catalog-filter-price';
import { withStore, withHistory } from '../../utils/mock-component';
import { makeFakeCamerasData } from '../../utils/mocks';

const mockCameraData = makeFakeCamerasData();
const mockShownData = mockCameraData.slice(0, 3);

describe('Component: Catalog filter price', () => {

  it('renders CatalogFilter component with data' , () => {
    const minRef = { current: null };
    const maxRef = { current: null };

    const { withStoreComponent } = withStore(<CatalogFilterPrice maxRef={maxRef} minRef={minRef} />, {
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

    expect(screen.getByTestId('catalog-filter-price-test')).toBeInTheDocument();
  });

});

