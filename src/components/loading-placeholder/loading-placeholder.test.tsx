import { render , screen} from '@testing-library/react';
import LoadingPlaceholder from './loading-placeholder';


describe('Component: Footer', () => {

  it('should render component', () => {
    render(<LoadingPlaceholder />);

    expect(screen.getByTestId('loading-placeholder-test')).toBeInTheDocument();
  });

});
