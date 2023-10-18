import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setActiveStatus, setBasketModalStatus} from '../../store/modal-process/modal-process.slice';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppRoute, StorageName } from '../../utils/const';
import { getBasketItems } from '../../store/basket-data/basket-data.selectors';

export default function ModalBasketSuccess() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const MODAL_CLOSE_TIME = 1000;

  const basketItems = useAppSelector(getBasketItems);

  const handleModalClose = () => {
    dispatch(setActiveStatus(false));
    localStorage.setItem(StorageName.Camera, JSON.stringify(basketItems));
    setTimeout(() => {
      dispatch(setBasketModalStatus(false));
    }, MODAL_CLOSE_TIME);

    document.body.style.overflow = 'unset';
  };

  const parsedLocation = useLocation();

  const isProductPage = Number(parsedLocation.pathname.replaceAll('/', '')) !== 0;

  useEffect(() => {
    const onEscClick = (evt: KeyboardEvent) => {
      if(evt.code === 'Escape') {
        handleModalClose();
      }
    };
    document.addEventListener('keydown', onEscClick);

    return () => {
      document.removeEventListener('keydown', onEscClick);
    };
  });

  const handleNavigateToBasket = () => {
    handleModalClose();
    navigate(AppRoute.Basket);
  };

  return (
    <div className="modal__wrapper">
      <div onClick={handleModalClose} className="modal__overlay" />
      <div className="modal__content">
        <p className="title title--h4">Товар успешно добавлен в корзину</p>
        <svg className="modal__icon" width={86} height={80} aria-hidden="true">
          <use xlinkHref="#icon-success" />
        </svg>
        <div className="modal__buttons">
          {isProductPage
            ?
            <Link onClick={handleModalClose} className="btn btn--transparent modal__btn" to={AppRoute.Root}>
          Продолжить покупки
            </Link>
            :
            <button onClick={handleModalClose} className="btn btn--transparent modal__btn" >
          Продолжить покупки
            </button>}
          <button onClick={handleNavigateToBasket} className="btn btn--purple modal__btn modal__btn--fit-width">
          Перейти в корзину
          </button>
        </div>
        <button onClick={handleModalClose} className="cross-btn" type="button" aria-label="Закрыть попап">
          <svg width={10} height={10} aria-hidden="true">
            <use xlinkHref="#icon-close" />
          </svg>
        </button>
      </div>
    </div>
  );
}
