import { render, screen } from '@testing-library/react';
import Banner from './banner';
import { makeFakePromos } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';


const mockPromoData = makeFakePromos();

describe('Component: Banner', () => {
  it('renders Swiper component with slides', () => {

    const { withStoreComponent } = withStore(<Banner />, {
      PROMO: {
        promos: mockPromoData,
        hasError: false,
      }
    });

    const prepComponent = withHistory(withStoreComponent);

    render(prepComponent);

    expect(screen.getByText(mockPromoData[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockPromoData[1].name)).toBeInTheDocument();
  });

});
