import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getChangedBasketItems } from '../../store/basket-data/basket-data.selectors';
import { changeItems, setItemToDelete } from '../../store/basket-data/basket-data.slice';
import { setActiveStatus, setRemovalModalStatus } from '../../store/modal-process/modal-process.slice';
import { TCamera } from '../../types/camera';
import { FilterCategory } from '../../utils/const';
import { formatNumberWithSpace } from '../../utils/utils';

type TBasketItemProps = {
  item: TCamera;
}

export default function BasketItem ({item} : TBasketItemProps) : JSX.Element {

  const {id, name , vendorCode , type , level, category, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x} = item;
  const dispatch = useAppDispatch();
  const basketItems = useAppSelector(getChangedBasketItems);

  const count = basketItems.filter((camera) => camera.id === id).length;

  const [currentCount , setCurrentCount] = useState<number>(count);

  const handleCrossClick = () => {
    document.body.style.overflow = 'hidden';
    dispatch(setItemToDelete(item));
    dispatch(setRemovalModalStatus(true));
    dispatch(setActiveStatus(true));
  };

  const hanldeIncrement = () => {
    setCurrentCount((prev) => prev + 1);
    dispatch(changeItems([id , currentCount + 1]));
  };

  const hanldeDecrement = () => {
    setCurrentCount((prev) => prev - 1);
    dispatch(changeItems([id , currentCount - 1]));
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    let newValue = Number(evt.target.value.replace(/[,.]/g, ''));

    if(isNaN(newValue) || newValue < 1) {
      newValue = 1;
    }
    if (newValue > 99) {
      newValue = 99;
    }


    setCurrentCount(newValue);
    dispatch(changeItems([id, newValue]));
  };

  return (
    <li data-testid='basket-item-test' className="basket-item">
      <div className="basket-item__img">
        <picture>
          <source
            type="image/webp"
            srcSet= {`${previewImgWebp}, ${previewImgWebp2x} 2x`}
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
          <li className="basket-item__list-item">
            {type} {category === 'Фотоаппарат' ? FilterCategory.Photo.toLowerCase() : FilterCategory.Video.toLowerCase()}
          </li>
          <li className="basket-item__list-item">
            {level} уровень
          </li>
        </ul>
      </div>
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>{formatNumberWithSpace(price)} ₽
      </p>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          onClick={hanldeDecrement}

          disabled={currentCount <= 1}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1" />
        <input
          type="text"
          id="counter1"
          value={currentCount}
          onChange={handleInputChange}
          min={1}
          max={99}
          aria-label="количество товара"
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          onClick={hanldeIncrement}
          disabled={currentCount >= 99}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>{formatNumberWithSpace(currentCount * price)} ₽
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={handleCrossClick}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </li>
  );
}
