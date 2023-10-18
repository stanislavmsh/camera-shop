import { render, screen } from '@testing-library/react';
import { makeFakeCamerasData } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import ModalBasketSuccess from './modal-basket-success';


const mockCameraData = makeFakeCamerasData();

describe('Component: modal basket success', () => {
  it('renders modal', () => {

    const { withStoreComponent } = withStore(<ModalBasketSuccess />, {
      BASKET: {
        items: mockCameraData,
        currentItem: undefined,
        changedItems: mockCameraData,
        couponName: null,
        couponValue: 0,
        isCouponInvalid: false,
        isCouponValid: false,
      },
    });

    const prepComponent = withHistory(withStoreComponent);

    render(prepComponent);
    expect(screen.getByTestId('modal-basket-success-test')).toBeInTheDocument();


  });

});
