import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { formatNumberWithSpace } from '../../utils/utils';
import { getModalInfo } from '../../store/modal-process/modal-process.selectors';
import { setActiveStatus, setBasketModalStatus, setPurchaseModalStatus } from '../../store/modal-process/modal-process.slice';
import { addItemToBasket } from '../../store/basket-data/basket-data.slice';
import { FilterCategory } from '../../utils/const';

export default function ModalBuy() : JSX.Element {
  const dispatch = useAppDispatch();
  const currentItem = useAppSelector(getModalInfo);

  const handleModalClose = () => {
    dispatch(setActiveStatus(false));
    dispatch(setPurchaseModalStatus(false));
    document.body.style.overflow = 'unset';
  };

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
  const handleBuyButton = () => {
    if(currentItem) {
      dispatch(addItemToBasket(currentItem));
    }
    dispatch(setBasketModalStatus(true));
  };

  return(
    <div className="modal__wrapper">
      <div onClick={handleModalClose} className="modal__overlay" />
      <div className="modal__content">
        <p className="title title--h4">Добавить товар в корзину</p>
        <div className="basket-item basket-item--short">
          <div className="basket-item__img">
            <picture>
              <source
                type="image/webp"
                srcSet={`${currentItem?.previewImgWebp || ''}, ${currentItem?.previewImgWebp2x || ''} 2x`}
              />
              <img
                src={currentItem?.previewImg}
                srcSet={`${currentItem?.previewImg2x || ''} 2x`}
                width={140}
                height={120}
                alt={
                  currentItem?.name
                }
              />
            </picture>
          </div>
          <div className="basket-item__description">
            <p className="basket-item__title">{currentItem?.name}</p>
            <ul className="basket-item__list">
              <li className="basket-item__list-item">
                <span className="basket-item__article">Артикул:</span>{' '}
                <span className="basket-item__number">{currentItem?.vendorCode}</span>
              </li>
              <li className="basket-item__list-item">{currentItem?.type} {currentItem?.category === 'Фотоаппарат' ? FilterCategory.Photo.toLowerCase() : FilterCategory.Video.toLowerCase()}</li>
              <li className="basket-item__list-item">{currentItem?.level} уровень</li>
            </ul>
            <p className="basket-item__price">
              <span className="visually-hidden">Цена:</span>{formatNumberWithSpace(currentItem?.price || 1)} ₽
            </p>
          </div>
        </div>
        <div className="modal__buttons">
          <button
            data-testid='modal-buy-test'
            id='purchase__button'
            onClick={handleBuyButton}
            className="btn btn--purple modal__btn modal__btn--fit-width"
            type="button"
          >
            <svg width={24} height={16} aria-hidden="true">
              <use xlinkHref="#icon-add-basket" />
            </svg>
          Добавить в корзину
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
