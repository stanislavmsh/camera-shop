import { makeFakeCamerasData } from '../../utils/mocks';
import ModalBuy from './modal-buy';
import { withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';


const mockCamerasData = makeFakeCamerasData();
const mockShownData = mockCamerasData.slice(0, 3);
const mockModal = mockCamerasData[0];

describe('Component: Modal Buy' , () => {
  it('should render ModalBuy when isActive is true', () => {
    const { withStoreComponent } = withStore(<ModalBuy />, {
      CAMERAS: {
        cameras: mockCamerasData,
        hasError: false,
        isDataLoading: false,
        shownItems: mockShownData,
        modalInfo: mockModal,
        purchaseModalStatus: true,
      }
    });

    render(withStoreComponent);

    const element = screen.getByTestId('modal-buy-test');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('is-active');

  });

  it('should not render ModalBuy when isActive is false', () => {
    const { withStoreComponent } = withStore(<ModalBuy />, {
      CAMERAS: {
        cameras: mockCamerasData,
        hasError: false,
        isDataLoading: false,
        shownItems: mockShownData,
        modalInfo: mockModal,
        purchaseModalStatus: false,
      }
    });

    render(withStoreComponent);

    const element = screen.getByTestId('modal-buy-test');
    expect(element).toBeInTheDocument();
    expect(element).not.toHaveClass('is-active');

  });
});
