import { render , screen} from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import BasketPage from './basket-page';


describe('Page: Basket Page', () => {
  it('should render page', () => {
    const pagePrepared = withHistory(<BasketPage />);

    render(pagePrepared);

    const page = screen.getByTestId('basket-page-test');

    expect(page).toBeInTheDocument();

  });
});
