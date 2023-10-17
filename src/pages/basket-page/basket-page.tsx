import MemoizedFooter from '../../components/footer/footer';
import MemoizedHeader from '../../components/header/header';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../utils/const';
import BasketList from '../../components/basket-list/basket-list';
import ModalComponent from '../../components/modal-component/modal-component';


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
              <div className="basket__summary">
                <div className="basket__promo">
                  <p className="title title--h4">
                Если у вас есть промокод на скидку, примените его в этом поле
                  </p>
                  <div className="basket-form">
                    <form action="#">
                      <div className="custom-input">
                        <label>
                          <span className="custom-input__label">Промокод</span>
                          <input
                            type="text"
                            name="promo"
                            placeholder="Введите промокод"
                          />
                        </label>
                        <p className="custom-input__error">Промокод неверный</p>
                        <p className="custom-input__success">Промокод принят!</p>
                      </div>
                      <button className="btn" type="submit">
                    Применить
                      </button>
                    </form>
                  </div>
                </div>
                <div className="basket__summary-order">
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Всего:</span>
                    <span className="basket__summary-value">111 390 ₽</span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Скидка:</span>
                    <span className="basket__summary-value basket__summary-value--bonus">
                  0 ₽
                    </span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text basket__summary-text--total">
                  К оплате:
                    </span>
                    <span className="basket__summary-value basket__summary-value--total">
                  111 390 ₽
                    </span>
                  </p>
                  <button className="btn btn--purple" type="submit">
                Оформить заказ
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        <ModalComponent />
      </main>
      <MemoizedFooter/>
    </div>


  );
}
