import { makeFakeCamerasData } from '../../utils/mocks';
import ModalBuy from './modal-buy';
import { withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';


const mockCamerasData = makeFakeCamerasData();
const mockShownData = mockCamerasData.slice(0, 3);

describe('Component: Modal Buy' , () => {
  it('should render ModalBuy when isActive is true', () => {
    const { withStoreComponent } = withStore(<ModalBuy />, {
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
      MODAL: {
        modalInfo: mockCamerasData[0],
        purchaseModalStatus: false,
        basketModalStatus: false,
        formModalStatus: false,
        successModalStatus: false,
        removalModalStatus: false,
        orderSuccessModalStatus: false,
        isActive: false,
      },
    });

    render(withStoreComponent);

    const element = screen.getByTestId('modal-buy-test');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Добавить в корзину');

  });

});
