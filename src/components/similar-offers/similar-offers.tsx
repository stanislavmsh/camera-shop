import MemoizedCard from '../card/card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination , Navigation , A11y } from 'swiper/modules';
import { useAppSelector } from '../../hooks';
import { getSimiralCameras } from '../../store/current-data/current-data.selectors';

import './similar-offers.css';


export default function SimilarOffers() : JSX.Element {

  const similars = useAppSelector(getSimiralCameras);

  return (

    <section data-testid="product-similar-test" className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            <Swiper
              slidesPerView={3}
              slidesPerGroup={3}
              spaceBetween={32}
              modules={[Navigation, A11y, Pagination]}
              navigation={{
                prevEl: '.slider-controls--prev',
                nextEl: '.slider-controls--next'
              }}
            >
              {similars.map((elem) => (
                <SwiperSlide key={`${elem.id}similars`}>
                  <MemoizedCard
                    cameraInfo={elem}
                    classCustom={similars.includes(elem) ? 'is-active custom_swipe' : ''}
                  />
                </SwiperSlide>
              ))}
            </Swiper >
            <button
              className="slider-controls slider-controls--prev"
              style={{pointerEvents: 'auto'}}
              type="button"
              aria-label="Предыдущий слайд"
            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow" />
              </svg>
            </button>
            <button
              className="slider-controls slider-controls--next"
              style={{pointerEvents: 'auto'}}
              type="button"
              aria-label="Следующий слайд"
            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );

}
