import { render , screen} from '@testing-library/react';
import ReviewsList from './reviews-list';
import { makeFakeComments } from '../../utils/mocks';

const mockComments = makeFakeComments();


describe('Component: Reviews List', () => {
  it('should render component', () => {
    render(< ReviewsList reviews={mockComments} />);

    const element = screen.getByTestId('reviews-block-test');

    expect(element).toBeInTheDocument();
  });
});
