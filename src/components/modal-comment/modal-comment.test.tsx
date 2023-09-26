import { makeFakeCamerasData, makeFakeComments, makeFakeCurrentCameraData } from '../../utils/mocks';
import ModalComment from './modal-comment';
import { withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';


const mockFunction = () => [];
const mockCurrentData = makeFakeCurrentCameraData();
const mockSimilarData = makeFakeCamerasData();
const mockComments = makeFakeComments();

describe('Component: Modal Comment' , () => {
  it('should render ReviewForm when isActive is true', () => {
    const { withStoreComponent } = withStore(<ModalComment isActive handleCloseForm={mockFunction}/>, {
      CURRENT: {
        currentInfo: mockCurrentData,
        hasError: false,
        isDataLoading: false,
        similarCameras: mockSimilarData,
        reviews: mockComments
      }
    });

    render(withStoreComponent);

    const element = screen.getByTestId('modal-test');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('is-active');

  });

  it('should not render ReviewForm when isActive is false', () => {
    const { withStoreComponent } = withStore(<ModalComment isActive={false} handleCloseForm={mockFunction}/>, {
      CURRENT: {
        currentInfo: mockCurrentData,
        hasError: false,
        isDataLoading: false,
        similarCameras: mockSimilarData,
        reviews: mockComments
      }
    });

    render(withStoreComponent);

    const element = screen.getByTestId('modal-test');
    expect(element).toBeInTheDocument();
    expect(element).not.toHaveClass('is-active');

  });
});
