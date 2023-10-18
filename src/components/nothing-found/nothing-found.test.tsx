import { render , screen} from '@testing-library/react';
import NothingFound from './nothing-found';


describe('Component: nothing found', () => {

  it('should render component', () => {
    render(<NothingFound />);

    expect(screen.getByTestId('nothing-found-test')).toBeInTheDocument();
  });

});
