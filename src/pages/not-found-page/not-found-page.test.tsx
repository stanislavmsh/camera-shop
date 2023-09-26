import { render , screen} from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import NotFoundPage from './not-found-page';


describe('Page: Basket Page', () => {
  it('should render page', () => {
    const pagePrepared = withHistory(<NotFoundPage />);

    render(pagePrepared);

    const page = screen.getByTestId('not-found-test');

    expect(page).toBeInTheDocument();

  });
});
