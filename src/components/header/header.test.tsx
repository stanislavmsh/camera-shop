

import MemoizedHeader from './header';
import { withHistory , withStore} from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import { makeFakeCamerasData } from '../../utils/mocks';

const mockCamerasData = makeFakeCamerasData();
const mockShownData = makeFakeCamerasData().slice(0, 3);

describe('Component: Card', () => {

  it('renders card component with data' , () => {

    const { withStoreComponent } = withStore(<MemoizedHeader />, {
      CAMERAS: {
        cameras: mockCamerasData,
        hasError: false,
        isDataLoading: false,
        shownItems: mockShownData,
        firstItem: 1,
        lastItem: 9,
      },
    });
    const prepComponent = withHistory(withStoreComponent);

    render(prepComponent);

    expect(screen.getByTestId('header-test')).toBeInTheDocument();
  });

});
