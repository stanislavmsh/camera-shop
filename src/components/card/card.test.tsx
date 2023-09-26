import { makeFakeCamerasData } from '../../utils/mocks';
import MemoizedCard from './card';
import { withHistory } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';


const mockCameraData = makeFakeCamerasData();
const singleCameraData = mockCameraData[0];

describe('Component: Card', () => {

  it('renders card component with data' , () => {

    const prepComponent = withHistory(<MemoizedCard cameraInfo={singleCameraData} classCustom="test-class" />);

    render(prepComponent);

    expect(screen.getByText(singleCameraData.name)).toBeInTheDocument();
  });

});
