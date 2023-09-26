

import MemoizedHeader from './header';
import { withHistory } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';

describe('Component: Card', () => {

  it('renders card component with data' , () => {

    const prepComponent = withHistory(<MemoizedHeader />);

    render(prepComponent);

    expect(screen.getByTestId('header-test')).toBeInTheDocument();
  });

});
