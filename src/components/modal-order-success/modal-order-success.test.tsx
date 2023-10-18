import { render, screen } from '@testing-library/react';
import { makeFakeCamerasData } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import ModalOrderSuccess from './modal-order-success';

const mockCameraData = makeFakeCamerasData();

describe('Component: modal order success', () => {
  it('renders modal of successful order', () => {

    const { withStoreComponent } = withStore(<ModalOrderSuccess />, {
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
    expect(screen.getByTestId('modal-order-success-test')).toBeInTheDocument();


  });

});
