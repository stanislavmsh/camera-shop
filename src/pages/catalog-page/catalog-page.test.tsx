import { render , screen} from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import CatalogPage from './catalog-page';
import { makeFakeCamerasData, makeFakeComments, makeFakePromos } from '../../utils/mocks';

const mockCameraData = makeFakeCamerasData();
const mockShownData = mockCameraData.slice(0, 3);
const mockPromoData = makeFakePromos();
const mockComments = makeFakeComments();


describe('Page: Catalog Page', () => {
  it('should render page', () => {
    const { withStoreComponent } = withStore(<CatalogPage />, {
      CAMERAS: {
        cameras: mockCameraData,
        hasError: false,
        isDataLoading: false,
        shownItems: mockShownData,
        modalInfo: undefined,
        purchaseModalStatus: false,
        formModalStatus: false,
        successModalStatus: false,
      },
      PROMO: {
        promos: mockPromoData,
        hasError: false,
      },
      CURRENT: {
        currentInfo: mockCameraData[0],
        hasError: false,
        isDataLoading: false,
        similarCameras: mockCameraData,
        reviews: mockComments
      }
    }
    );


    const pagePrepared = withHistory(withStoreComponent);

    render(pagePrepared);

    const page = screen.getByTestId('catalog-page-test');

    expect(page).toBeInTheDocument();

  });
});
