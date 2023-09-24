import React from 'react';
import { TCamera } from '../../types/camera';
import { Link } from 'react-router-dom';
import { AppRoute , STARS_RATING } from '../../utils/const';

import './card.css';

type TCardProps = {
  cameraInfo : TCamera;
  classCustom: string;
}

function Card({cameraInfo , classCustom} : TCardProps): JSX.Element {


  return (

    <div className={`product-card ${classCustom}`}>
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet= {`${cameraInfo.previewImgWebp}, ${cameraInfo.previewImgWebp2x} 2x`}
          />
          <img
            src={cameraInfo.previewImg}
            srcSet={`${cameraInfo.previewImg2x} 2x`}
            width={280}
            height={240}
            alt={cameraInfo.name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {STARS_RATING.map((elem) =>
            (
              <svg key={elem} width={17} height={16} aria-hidden="true">
                <use xlinkHref={elem <= cameraInfo.rating ? '#icon-full-star' : '#icon-star'} />
              </svg>
            ))}
          <p className="visually-hidden">Рейтинг: {cameraInfo.rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>{cameraInfo.reviewCount}
          </p>
        </div>
        <p className="product-card__title">
          {cameraInfo.name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{cameraInfo.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
        >
                      Купить
        </button>
        <Link className="btn btn--transparent" to={`${AppRoute.Root}${cameraInfo.id}`}>
                      Подробнее
        </Link>
      </div>
    </div>
  );
}

const MemoizedCard = React.memo(Card);

export default MemoizedCard;
