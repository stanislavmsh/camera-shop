import { Routes , Route} from 'react-router-dom';
import { AppRoute } from '../../utils/const';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import ProductPage from '../../pages/product-page/product-page';
import BasketPage from '../../pages/basket-page/basket-page';

export default function App() : JSX.Element {

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
      </Routes>
    </HistoryRouter>
  );
}
