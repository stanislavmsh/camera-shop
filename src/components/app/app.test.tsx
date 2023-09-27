import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withStore } from '../../utils/mock-component';
import App from './app';
import { makeFakeCamerasData, makeFakeComments, makeFakeCurrentCameraData, makeFakePromos } from '../../utils/mocks';

const mockCameraData = makeFakeCamerasData();
const mockShownData = mockCameraData.slice(0, 3);
const mockPromoData = makeFakePromos();
const mockCurrentData = makeFakeCurrentCameraData();
const mockComments = makeFakeComments();

describe('Component: App', () => {
  it('should render app', () => {
    const { withStoreComponent } = withStore(<App />, {
      CAMERAS: {
        cameras: mockCameraData,
        hasError: false,
        isDataLoading: false,
        shownItems: mockShownData
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
      }});

    render(withStoreComponent);

    const component = screen.getByTestId('pagination-test');

    expect(component).toBeInTheDocument();
  });

  it('should navigate to Single item page', async () => {
    const { withStoreComponent } = withStore(<App />, {
      CAMERAS: {
        cameras: mockCameraData,
        hasError: false,
        isDataLoading: false,
        shownItems: mockShownData
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
      }});

    render(withStoreComponent);

    const user = userEvent.setup();

    const buttons = screen.getAllByTestId('button-more-test');

    await user.click(buttons[1]);

    expect(screen.getByText('Похожие товары')).toBeInTheDocument();
  });

  it('should show Loading if loading', () => {
    const { withStoreComponent } = withStore(<App />, {
      CAMERAS: {
        cameras: mockCameraData,
        hasError: false,
        isDataLoading: true,
        shownItems: mockShownData
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
      }});

    render(withStoreComponent);

    const loadingMessage = screen.getByText('Loading...');

    expect(loadingMessage).toBeInTheDocument();
  });

});