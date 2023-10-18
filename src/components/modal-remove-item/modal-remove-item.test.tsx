import { render, screen } from '@testing-library/react';
import { makeFakeCamerasData } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import ModalRemoveItem from './modal-remove-item';


const mockCameraData = makeFakeCamerasData();

describe('Component: modal remove item', () => {
  it('renders modal to confirm item removal', () => {

    const { withStoreComponent } = withStore(<ModalRemoveItem />, {
      BASKET: {
        items: mockCameraData,
        currentItem: mockCameraData[0],
        changedItems: mockCameraData,
        couponName: null,
        couponValue: 0,
        isCouponInvalid: false,
        isCouponValid: false,
      },
    });

    const prepComponent = withHistory(withStoreComponent);

    render(prepComponent);
    expect(screen.getByTestId('modal-remove-item-test')).toBeInTheDocument();


  });

});
