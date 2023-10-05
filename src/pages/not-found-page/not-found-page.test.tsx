import { render , screen} from '@testing-library/react';
import { withHistory , withStore} from '../../utils/mock-component';
import NotFoundPage from './not-found-page';
import { makeFakeCamerasData } from '../../utils/mocks';

const mockCameraData = makeFakeCamerasData();
const mockShownData = mockCameraData.slice(0, 3);

describe('Page: Basket Page', () => {
  it('should render page', () => {

    const { withStoreComponent } = withStore(<NotFoundPage />, {
      CAMERAS: {
        cameras: mockCameraData,
        hasError: false,
        isDataLoading: false,
        shownItems: mockShownData,
        firstItem: 1,
        lastItem: 9,
      },
    });
    const pagePrepared = withHistory(withStoreComponent);

    render(pagePrepared);

    const page = screen.getByTestId('not-found-test');

    expect(page).toBeInTheDocument();

  });
});
