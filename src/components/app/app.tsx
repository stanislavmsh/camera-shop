import { Routes , Route} from 'react-router-dom';
import { AppRoute } from '../../utils/const';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import ProductPage from '../../pages/product-page/product-page';
import BasketPage from '../../pages/basket-page/basket-page';
import { useAppSelector } from '../../hooks';
import { getLoadingStatus } from '../../store/cameras-data/cameras-data.selectors';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import LoadingPlaceholder from '../loading-placeholder/loading-placeholder';

export default function App() : JSX.Element {

  const isDataLoading = useAppSelector(getLoadingStatus);

  if(isDataLoading) {
    return (
      <LoadingPlaceholder />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path = {AppRoute.Root}
          element = { <CatalogPage /> }
        />
        <Route
          path = {AppRoute.Basket}
          element = { <BasketPage /> }
        />
        <Route
          path = {`${AppRoute.Root}/:id`}
          element = { <ProductPage /> }
        />
        <Route
          path='*'
          element = { <NotFoundPage />}
        />
      </Routes>
    </HistoryRouter>
  );
}
