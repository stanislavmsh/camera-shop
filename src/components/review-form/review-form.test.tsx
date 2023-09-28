import { render, screen } from '@testing-library/react';
import ReviewForm from './review-form';
import { withStore } from '../../utils/mock-component';
import { makeFakeCamerasData, makeFakeComments, makeFakeCurrentCameraData } from '../../utils/mocks';

const mockCurrentData = makeFakeCurrentCameraData();
const mockSimilarData = makeFakeCamerasData();
const mockComments = makeFakeComments();

describe('ReviewForm Component', () => {
  it('should render form', () => {
    const mockHandleCloseForm = vitest.fn();
    const mockHandleNavigateToSuccess = vitest.fn();

    const { withStoreComponent } = withStore(
      <ReviewForm
        handleCloseForm={mockHandleCloseForm}
        handleNavigateToSuccess={mockHandleNavigateToSuccess}
        cameraId={123}
        isActive
      />, {
        CURRENT: {
          currentInfo: mockCurrentData,
          hasError: false,
          isDataLoading: false,
          similarCameras: mockSimilarData,
          reviews: mockComments
        }
      });

    render(
      withStoreComponent
    );

    const submitButton = screen.getByTestId('submit-button-test');

    expect(submitButton).toBeInTheDocument();
  });
});
