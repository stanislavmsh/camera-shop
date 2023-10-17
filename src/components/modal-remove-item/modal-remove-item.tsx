import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentBasketItem } from '../../store/basket-data/basket-data.selectors';
import { removeItem } from '../../store/basket-data/basket-data.slice';
import { setActiveStatus, setRemovalModalStatus } from '../../store/modal-process/modal-process.slice';
import { TCamera } from '../../types/camera';
import { AppRoute, FilterCategory } from '../../utils/const';


export default function ModalRemoveItem () : JSX.Element {
  const dispatch = useAppDispatch();

  const currentItem = useAppSelector(getCurrentBasketItem);

  const {vendorCode, category, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, name , type, level} = currentItem as TCamera;

  const handleCloseModal = () => {
    dispatch(setActiveStatus(false));
    dispatch(setRemovalModalStatus(false));
    document.body.style.overflow = 'unset';
  };

  const hanldeRemoveButton = () => {
    dispatch(removeItem());
    handleCloseModal();
  };

  return (
    <div className="modal__wrapper">
      <div onClick={handleCloseModal} className="modal__overlay" />
      <div className="modal__content">
        <p className="title title--h4">Удалить этот товар?</p>
        <div className="basket-item basket-item--short">
          <div className="basket-item__img">
            <picture>
              <source
                type="image/webp"
                srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}
              />
              <img
                src={previewImg}
                srcSet={`${previewImg2x} 2x`}
                width={140}
                height={120}
                alt={name}
              />
            </picture>
          </div>
          <div className="basket-item__description">
            <p className="basket-item__title">{name}</p>
            <ul className="basket-item__list">
              <li className="basket-item__list-item">
                <span className="basket-item__article">Артикул:</span>{' '}
                <span className="basket-item__number">{vendorCode}</span>
              </li>
              <li className="basket-item__list-item">{type} {category === 'Фотоаппарат' ? FilterCategory.Photo.toLowerCase() : FilterCategory.Video.toLowerCase()}</li>
              <li className="basket-item__list-item">{level} уровень</li>
            </ul>
          </div>
        </div>
        <div className="modal__buttons">
          <button
            className="btn btn--purple modal__btn modal__btn--half-width"
            type="button"
            onClick={hanldeRemoveButton}
          >
        Удалить
          </button>
          <Link
            className="btn btn--transparent modal__btn modal__btn--half-width"
            to={AppRoute.Basket}
            onClick={handleCloseModal}
          >
        Продолжить покупки
          </Link>
        </div>
        <button onClick={handleCloseModal} className="cross-btn" type="button" aria-label="Закрыть попап">
          <svg width={10} height={10} aria-hidden="true">
            <use xlinkHref="#icon-close" />
          </svg>
        </button>
      </div>
    </div>

  );
}
