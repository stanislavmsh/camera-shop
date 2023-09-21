
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useAppSelector } from '../../hooks';
import { getPromos } from '../../store/promo-data/promo-data.selectors';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import'./banner.css';

export default function Banner() {

  const promoData = useAppSelector(getPromos);

  const pagination = {
    clickable: true,
    renderBullet: function (_ : number, className : string) {
      return `<span class="${ className }"></span>`;
    },
  };

  return(
    <Swiper
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination = {pagination}
      modules={[Autoplay, Pagination, Navigation]}
      loop
    >
      {promoData.map((elem) => (
        <SwiperSlide key={elem.id}>
          <div

            className="banner"
          >
            <picture>
              <source
                type="image/webp"
                srcSet={`${elem.previewImgWebp} , ${elem.previewImgWebp2x} 2x`}
              />
              <img
                src={elem.previewImg}
                srcSet={`${elem.previewImg2x} 2x`}
                width={1280}
                height={280}
                alt="баннер"
              />
            </picture>
            <p className="banner__info">
              <span className="banner__message"></span>
              <span className="title title--h1">
                {elem.name}
              </span>
              <span className="banner__text">
          Профессиональная камера от&nbsp;известного производителя
              </span>
              <a className="btn" href="#">
          Подробнее
              </a>
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>

  );

}
