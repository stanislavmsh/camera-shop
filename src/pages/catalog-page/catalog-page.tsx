import Banner from '../../components/banner/banner';
import MemoizedCards from '../../components/cards/cards';
import MemoizedFooter from '../../components/footer/footer';
import MemoizedHeader from '../../components/header/header';
import ModalComponent from '../../components/modal-component/modal-component';
import MemoizedPagination from '../../components/pagination/pagination';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import { AppRoute } from '../../utils/const';
import { Link } from 'react-router-dom';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import LoadingPlaceholder from '../../components/loading-placeholder/loading-placeholder';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getDataByPriceStatus } from '../../store/cameras-data/cameras-data.selectors';
import { setPriceMinMax, resetCameras } from '../../store/cameras-data/cameras-data.slice';

export default function CatalogPage() : JSX.Element {
  const dispatch = useAppDispatch();
  const isDataByPriceLoading = useAppSelector(getDataByPriceStatus);


  const handleCatalogClick = () => {
    dispatch(setPriceMinMax(['', '']));
    dispatch(resetCameras());
  };

  return (
    <div className="wrapper">
      <MemoizedHeader />
      <main>
        <Banner />
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link
                    onClick={handleCatalogClick}
                    className="breadcrumbs__link" to={AppRoute.Root}
                  >
                Главная
                    <svg width={5} height={8} aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini" />
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">
                Каталог
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <section data-testid='catalog-page-test' className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <CatalogFilter/>
                </div>
                <div className="catalog__content">
                  <CatalogSort />
                  {isDataByPriceLoading
                    ?
                    <LoadingPlaceholder/>
                    :
                    <>
                      <MemoizedCards />
                      <MemoizedPagination/>
                    </>}

                </div>
              </div>
            </div>
          </section>
        </div>
        <ModalComponent />
      </main>
      <MemoizedFooter />
    </div>

  );

}
