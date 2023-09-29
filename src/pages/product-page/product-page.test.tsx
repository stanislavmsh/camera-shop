import { render , screen} from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import ProductPage from './product-page';
import { makeFakeCamerasData, makeFakeComments, makeFakeCurrentCameraData, makeFakePromos } from '../../utils/mocks';

const mockCameraData = makeFakeCamerasData();
const mockShownData = mockCameraData.slice(0, 3);
const mockPromoData = makeFakePromos();
const mockCurrentData = makeFakeCurrentCameraData();
const mockComments = makeFakeComments();


describe('Page: Catalog Page', () => {
  it('should render page', () => {
    const { withStoreComponent } = withStore(<ProductPage />, {
      CAMERAS: {
        cameras: mockCameraData,
        hasError: false,
        isDataLoading: false,
        shownItems: mockShownData,
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
        modalInfo: undefined,
        purchaseModalStatus: false,
        formModalStatus: false,
        successModalStatus: false,
      }
    }
    );


    const pagePrepared = withHistory(withStoreComponent);

    render(pagePrepared);

    const page = screen.getByTestId('product-page-test');

    expect(page).toBeInTheDocument();

  });
});
