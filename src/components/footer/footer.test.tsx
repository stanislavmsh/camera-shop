import { render , screen} from '@testing-library/react';
import MemoizedFooter from './footer';


describe('Component: Footer', () => {

  it('should render component', () => {
    render(<MemoizedFooter />);

    expect(screen.getByTestId('footer-test')).toBeInTheDocument();
  });

});
