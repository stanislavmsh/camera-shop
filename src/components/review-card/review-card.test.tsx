import { render , screen} from '@testing-library/react';
import ReviewCard from './review-card';
import { makeFakeComments } from '../../utils/mocks';

const mockComments = makeFakeComments();
const mockSingleComment = mockComments[0];


describe('Component: Review Card', () => {
  it('should render component', () => {
    render(< ReviewCard reviewInfo={mockSingleComment}/>);

    const element = screen.getByTestId('review-card-test');

    expect(element).toBeInTheDocument();
  });
});
