import { render , screen} from '@testing-library/react';
import EmptyBasket from './empty-basket';


describe('Component: Empty Basket', () => {

  it('should render component', () => {
    render(<EmptyBasket />);

    expect(screen.getByTestId('empty-basket-test')).toBeInTheDocument();
  });

});
