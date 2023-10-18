import { render, screen } from '@testing-library/react';
import BasketForm from './basket-form';
import { makeFakeCamerasData } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';


const mockCameraData = makeFakeCamerasData();

describe('Component: basket form', () => {
  it('renders basket coupon request section', () => {
    const mockRef = {current: null};

    const { withStoreComponent } = withStore(<BasketForm inputRef={mockRef} />, {
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

    expect(screen.getByTestId('basket-form-test')).toBeInTheDocument();
  });

});
