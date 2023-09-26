import { render , screen, fireEvent} from '@testing-library/react';
import CommentSuccess from './comment-success';


const mockFunction = vitest.fn();

describe('Component: Comment Success', () => {

  it('should render component', () => {
    render(<CommentSuccess handleCommentSuccess={() => []}/>);

    expect(screen.getByText('Спасибо за отзыв')).toBeInTheDocument();
  });

  it('button should call handleSuccessFunction', () => {
    render(<CommentSuccess handleCommentSuccess={mockFunction}/>);

    const backToShoppingButton = screen.getByText('Вернуться к покупкам');
    fireEvent.click(backToShoppingButton);

    expect(mockFunction).toHaveBeenCalled();

  });

  it('cross should call handleSuccesFunction', () => {
    render(<CommentSuccess handleCommentSuccess={mockFunction}/>);

    const crossButton = screen.getByLabelText('Закрыть попап');
    fireEvent.click(crossButton);

    expect(mockFunction).toHaveBeenCalled();

  });

});
