import MemoizedFooter from '../../components/footer/footer';
import MemoizedHeader from '../../components/header/header';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../utils/const';
import BasketList from '../../components/basket-list/basket-list';
import ModalComponent from '../../components/modal-component/modal-component';
import BasketSummary from '../../components/basket-summary/basket-summary';


export default function BasketPage() : JSX.Element {


  return (
    <div className="wrapper">
      <MemoizedHeader/>
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Root}>
                Главная
                    <svg width={5} height={8} aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini" />
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Root}>
                Каталог
                    <svg width={5} height={8} aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini" />
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">
                Корзина
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <section data-testid='basket-page-test' className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              <BasketList />
              <BasketSummary />
            </div>
          </section>
        </div>
        <ModalComponent />
      </main>
      <MemoizedFooter/>
    </div>


  );
}
