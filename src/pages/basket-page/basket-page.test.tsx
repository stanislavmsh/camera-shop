import { render , screen} from '@testing-library/react';
import { withHistory , withStore} from '../../utils/mock-component';
import BasketPage from './basket-page';
import { makeFakeCamerasData } from '../../utils/mocks';


const mockCameraData = makeFakeCamerasData();
const mockShownData = mockCameraData.slice(0, 3);

describe('Page: Basket Page', () => {
  it('should render page', () => {

    const { withStoreComponent } = withStore(<BasketPage />, {
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
      },
      BASKET: {
        items: mockCameraData,
        currentItem: undefined,
        changedItems: mockCameraData,
        couponName: null,
        couponValue: 0,
        isCouponInvalid: false,
        isCouponValid: false,
      },
      MODAL: {
        modalInfo: mockCameraData[0],
        purchaseModalStatus: false,
        basketModalStatus: false,
        formModalStatus: false,
        successModalStatus: false,
        removalModalStatus: false,
        orderSuccessModalStatus: false,
        isActive: false,
      },
      CURRENT: {
        currentInfo : undefined,
        hasError: false,
        isDataLoading: false,
        similarCameras: [],
        reviews: [],
      }
    }
    );

    const pagePrepared = withHistory(withStoreComponent);

    render(pagePrepared);

    const page = screen.getByTestId('basket-page-test');

    expect(page).toBeInTheDocument();

  });
});
