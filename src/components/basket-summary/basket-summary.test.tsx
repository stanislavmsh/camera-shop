import { render, screen } from '@testing-library/react';
import BasketSummary from './basket-summary';
import { makeFakeCamerasData } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';


const mockCameraData = makeFakeCamerasData();

describe('Component: basket summary', () => {
  it('renders prices', () => {

    const { withStoreComponent } = withStore(<BasketSummary />, {
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
    expect(screen.getByTestId('basket-summary-test')).toBeInTheDocument();


  });

});
