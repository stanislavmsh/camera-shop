import { render, screen } from '@testing-library/react';
import BasketList from './basket-list';
import { makeFakeCamerasData } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';


const mockCameraData = makeFakeCamerasData();

describe('Component: basket list', () => {
  it('renders list of unique items', () => {

    const { withStoreComponent } = withStore(<BasketList />, {
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
    expect(screen.getByTestId('basket-list-test')).toBeInTheDocument();


  });

});
