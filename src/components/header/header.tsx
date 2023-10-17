import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../utils/const';
import SearchForm from '../search-form/search-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { resetCameras, setPriceMinMax } from '../../store/cameras-data/cameras-data.slice';
import { getChangedBasketItems } from '../../store/basket-data/basket-data.selectors';

function Header() : JSX.Element {
  const dispatch = useAppDispatch();
  const handleLogoClick = () => {
    dispatch(setPriceMinMax(['', '']));
    dispatch(resetCameras());
  };

  const itemsInBasket = useAppSelector(getChangedBasketItems).length;


  return (
    <header data-testid='header-test' className="header" id="header">
      <div className="container">
        <Link
          className="header__logo"
          to={AppRoute.Root}
          aria-label="Переход на главную"
          onClick={handleLogoClick}
        >
          <svg width={100} height={36} aria-hidden="true">
            <use xlinkHref="#icon-logo" />
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link
                className="main-nav__link" to="/"
                onClick={handleLogoClick}
              >
              Каталог
              </Link>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
              Гарантии
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
              Доставка
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
              О компании
              </a>
            </li>
          </ul>
        </nav>
        <SearchForm />
        <Link className="header__basket-link" to={AppRoute.Basket}>
          <svg width={16} height={16} aria-hidden="true">
            <use xlinkHref="#icon-basket" />
          </svg>
          {itemsInBasket !== 0 && <span className="header__basket-count">{itemsInBasket}</span>}
        </Link>
      </div>
    </header>
  );
}


const MemoizedHeader = React.memo(Header);

export default MemoizedHeader;
