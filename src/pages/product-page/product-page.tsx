import { useEffect, useState , useCallback, useRef } from 'react';
import MemoizedFooter from '../../components/footer/footer';
import MemoizedHeader from '../../components/header/header';
import ReviewBlock from '../../components/review-block/review-block';
import SimilarOffers from '../../components/similar-offers/similar-offers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentInfo } from '../../store/current-data/current-data.selectors';
import { Link, useParams , useSearchParams} from 'react-router-dom';
import { fetchCurrentAction, fetchReviewsAction, fetchSimilarAction } from '../../store/current-data/current-data.action';
import { AppRoute, STARS_RATING } from '../../utils/const';


export default function ProductPage() : JSX.Element {

  const dispatch = useAppDispatch();
  const currentId = useParams().id;
  const currentProduct = useAppSelector(getCurrentInfo);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDescription, setIsDescription] = useState<boolean>(true);
  const parsedParam = searchParams.get('type');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleScrollToTop = () => {
    if(wrapperRef.current) {
      wrapperRef.current.scrollIntoView({behavior: 'smooth'});
    }
  };

  useEffect(() => {
    if(parsedParam === 'stats') {
      setIsDescription(false);
    } else {
      setIsDescription(true);
    }
    if(currentId) {
      dispatch(fetchCurrentAction(Number(currentId)));
      dispatch(fetchReviewsAction(Number(currentId)));
      dispatch(fetchSimilarAction(Number(currentId)));
    }
  }, [dispatch, currentId , setIsDescription , parsedParam]);


  const handleDescriptionClick = useCallback(() => {
    setIsDescription(true);
    setSearchParams({type: 'description'});
  },[setSearchParams]);

  const handleStatsClick = useCallback(() => {
    setIsDescription(false);
    setSearchParams({type: 'stats'});
  }, [setSearchParams]);


  return(

    <div ref={wrapperRef} id='page__top' className="wrapper">
      <MemoizedHeader />
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="/">
                Главная
                    <svg width={5} height={8} aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini" />
                    </svg>
                  </a>
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
                    {currentProduct?.name}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="page-content__section">
            <section data-testid='product-page-test' className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`${currentProduct?.previewImgWebp || ''}, ${currentProduct?.previewImgWebp2x || ''} 2x`}
                    />
                    <img
                      src={currentProduct?.previewImg}
                      srcSet={`${currentProduct?.previewImg2x || ''} 2x`}
                      width={560}
                      height={480}
                      alt="Ретрокамера Das Auge IV"
                    />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{currentProduct?.name}</h1>
                  <div className="rate product__rate">
                    {currentProduct && STARS_RATING.map((elem) =>
                      (
                        <svg key={`${elem}currentrating`} width={17} height={16} aria-hidden="true">
                          <use xlinkHref={elem <= currentProduct.rating ? '#icon-full-star' : '#icon-star'} />
                        </svg>
                      ))}
                    <p className="visually-hidden">Рейтинг:{currentProduct?.rating}</p>
                    <p className="rate__count">
                      <span className="visually-hidden">Всего оценок:</span>{currentProduct?.reviewCount}
                    </p>
                  </div>
                  <p className="product__price">
                    <span className="visually-hidden">Цена:</span>{currentProduct?.price} ₽
                  </p>
                  <button className="btn btn--purple" type="button">
                    <svg width={24} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-add-basket" />
                    </svg>
                Добавить в корзину
                  </button>
                  <div className="tabs product__tabs">
                    <div className="tabs__controls product__tabs-controls">
                      <button onClick={handleStatsClick} className={`tabs__control ${!isDescription ? 'is-active' : ''}`} type="button">
                    Характеристики
                      </button>
                      <button onClick={handleDescriptionClick} className={`tabs__control ${isDescription ? 'is-active' : ''}`} type="button">
                    Описание
                      </button>
                    </div>
                    <div className="tabs__content">
                      <div className={`tabs__element ${!isDescription ? 'is-active' : ''}`}>
                        <ul className="product__tabs-list">
                          <li className="item-list">
                            <span className="item-list__title">Артикул:</span>
                            <p className="item-list__text"> {currentProduct?.vendorCode}</p>
                          </li>
                          <li className="item-list">
                            <span className="item-list__title">Категория:</span>
                            <p className="item-list__text">{currentProduct?.category}</p>
                          </li>
                          <li className="item-list">
                            <span className="item-list__title">Тип камеры:</span>
                            <p className="item-list__text">{currentProduct?.type}</p>
                          </li>
                          <li className="item-list">
                            <span className="item-list__title">Уровень:</span>
                            <p className="item-list__text">{currentProduct?.level}</p>
                          </li>
                        </ul>
                      </div>
                      <div className={`tabs__element ${isDescription ? 'is-active' : ''}`}>
                        <div className="product__tabs-text">
                          <p>
                            {currentProduct?.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="page-content__section">
            <SimilarOffers />
          </div>
          <div className="page-content__section">
            <ReviewBlock />
          </div>
        </div>
      </main>
      <Link onClick={handleScrollToTop} className="up-btn" to={`${parsedParam !== null ? `?type=${parsedParam}` : ''}#header`}>
        <svg width={12} height={18} aria-hidden="true">
          <use xlinkHref="#icon-arrow2" />
        </svg>
      </Link>
      <MemoizedFooter />
    </div>

  );

}
