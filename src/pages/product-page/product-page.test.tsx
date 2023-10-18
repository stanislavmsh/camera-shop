import { render , screen} from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import ProductPage from './product-page';
import { makeFakeCamerasData, makeFakeComments, makeFakeCurrentCameraData, makeFakePromos } from '../../utils/mocks';

const mockCameraData = makeFakeCamerasData();
const mockShownData = mockCameraData.slice(0, 3);
const mockPromoData = makeFakePromos();
const mockCurrentData = makeFakeCurrentCameraData();
const mockComments = makeFakeComments();


describe('Page: Catalog Page ', () => {
  it('should render page', () => {
    const { withStoreComponent } = withStore(<ProductPage />, {
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
      PROMO: {
        promos: mockPromoData,
        hasError: false,
      },
      CURRENT: {
        currentInfo: mockCurrentData,
        hasError: false,
        isDataLoading: false,
        similarCameras: mockCameraData,
        reviews: mockComments
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
      BASKET: {
        items: mockCameraData,
        currentItem: undefined,
        changedItems: mockCameraData,
        couponName: null,
        couponValue: 0,
        isCouponInvalid: false,
        isCouponValid: false,
      },
    }
    );


    const pagePrepared = withHistory(withStoreComponent);

    render(pagePrepared);

    const page = screen.getByTestId('product-page-test');

    expect(page).toBeInTheDocument();

  });
});
