import { render, screen } from '@testing-library/react';
import BasketItem from './basket-item';
import { makeFakeCamerasData } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';


const mockCameraData = makeFakeCamerasData();

describe('Component: basket item', () => {
  it('renders single item', () => {

    const { withStoreComponent } = withStore(<BasketItem item={mockCameraData[0]}/>, {
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

    expect(screen.getByTestId('basket-item-test')).toBeInTheDocument();
  });

});
