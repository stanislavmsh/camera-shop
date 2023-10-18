

import MemoizedHeader from './header';
import { withHistory , withStore} from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import { makeFakeCamerasData } from '../../utils/mocks';

const mockCamerasData = makeFakeCamerasData();
const mockShownData = makeFakeCamerasData().slice(0, 3);

describe('Component: Card', () => {

  it('renders card component with data' , () => {

    const { withStoreComponent } = withStore(<MemoizedHeader />, {
      CAMERAS: {
        cameras: mockCamerasData,
        filteredCameras: mockCamerasData,
        storedItems: mockCamerasData,
        backupCameras: mockCamerasData,
        hasError: false,
        isDataLoading: false,
        shownItems: mockShownData,
        firstItem: 1,
        lastItem: 9,
        isDataByPriceLoading: false,
        priceMinMax: ['', '']
      },
      BASKET: {
        items: mockCamerasData,
        currentItem: undefined,
        changedItems: mockCamerasData,
        couponName: null,
        couponValue: 0,
        isCouponInvalid: false,
        isCouponValid: false,
      },
    });
    const prepComponent = withHistory(withStoreComponent);

    render(prepComponent);

    expect(screen.getByTestId('header-test')).toBeInTheDocument();
  });

});
