import React, {useState, useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCameras } from '../../store/cameras-data/cameras-data.selectors';
import { useSearchParams } from 'react-router-dom';
import usePagination from '@mui/material/usePagination';
import { sortShownItems } from '../../store/cameras-data/cameras-data.slice';
import styles from './pagination.module.css';

function Pagination() : JSX.Element {
  const dispatch = useAppDispatch();

  const [searchParams , setSearchParams] = useSearchParams();
  const PRODUCTS_PER_PAGE = 9;
  const camerasList = useAppSelector(getCameras);
  const pageCount = Math.ceil(camerasList.length / PRODUCTS_PER_PAGE);
  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const safePage = pageFromUrl > pageCount ? pageCount : pageFromUrl;
  const orderParams = searchParams.get('order');
  const sortParams = searchParams.get('sort');


  const [currentPages , setCurrentPages] = useState({
    current : safePage,
    paginationMin: 0,
    paginationMax: 3,
  });

  const { items } = usePagination({
    count: pageCount,
    hideNextButton: currentPages.paginationMax >= pageCount,
    hidePrevButton: currentPages.paginationMax <= 3,
    page: currentPages.current,
    siblingCount: 2,
  });

  useEffect(() => {
    const start = (safePage - 1) * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;
    if (safePage === 1) {
      setCurrentPages({
        current: safePage,
        paginationMin: 0,
        paginationMax: 3,
      });
    }
    dispatch(sortShownItems([start, end]));
    if(pageFromUrl > pageCount) {
      searchParams.set('page', safePage.toString());
      if(orderParams) {
        searchParams.set('order', orderParams);
      }
      if(sortParams) {
        searchParams.set('sort', sortParams);
      }
      setSearchParams(searchParams);
    }
  }, [safePage , dispatch , pageCount, pageFromUrl, setSearchParams, searchParams, orderParams, sortParams]);

  const handleNextClick = (type: 'next' | 'previous') => {
    setCurrentPages((prevPages) => {
      const step = type === 'next' ? 1 : -1;

      return {
        ...prevPages,
        current: prevPages.current + step
      };
    });
    searchParams.set('page', type === 'next' ? (currentPages.current + 1).toString() : (currentPages.current - 1).toString());
    if(orderParams) {
      searchParams.set('order', orderParams);
    }
    if(sortParams) {
      searchParams.set('sort', sortParams);
    }
    setSearchParams(searchParams);
  };

  const handlePageClick = (page : number) => {
    searchParams.set('page', page.toString());
    if(orderParams) {
      searchParams.set('order', orderParams);
    }
    if(sortParams) {
      searchParams.set('sort', sortParams);
    }
    setSearchParams(searchParams);
    setCurrentPages((prevPages) => ({...prevPages, current: page}));
  };


  if(currentPages.current > currentPages.paginationMax) {
    setCurrentPages((prevPages) => {
      const step = 3;

      return {
        ...prevPages,
        paginationMax: prevPages.paginationMax + step,
        paginationMin: prevPages.paginationMin + step,
      };
    });
  } else if (currentPages.current < currentPages.paginationMin + 1){
    setCurrentPages((prevPages) => {
      const step = 3;

      return {
        ...prevPages,
        paginationMax: prevPages.paginationMax - step,
        paginationMin: prevPages.paginationMin - step,
      };
    });
  }

  return (
    <div data-testid ='pagination-test' className="pagination">
      <ul className="pagination__list">
        {items.map(({ page, type, selected }) => {
          let children;
          const isPageInRange = page as number <= currentPages.paginationMax && page as number > currentPages.paginationMin;

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = null;
          }
          if (type === 'page' && isPageInRange) {
            children = (
              <li key={`${page as number}${type}keyss`} className="pagination__item">
                <button
                  // to={`${AppRoute.Root}?page=${page as number}`}
                  className={`pagination__link ${styles['pagination__button']} ${selected ? 'pagination__link--active' : ''}`}
                  onClick={() => {
                    handlePageClick(page as number);
                  }}
                >
                  {page}
                </button>
              </li>

            );
          }
          if (type === 'next' || type === 'previous'){
            children = (

              <li key={`${page as number}button`} className="pagination__item">
                <button
                  className = {`${styles['pagination__next-prev']} pagination__link pagination__link--text`}
                  onClick={() => handleNextClick(type)}
                >
                  {type === 'next' ? 'Далее' : 'Назад'}
                </button>
              </li>
            );
          }

          return children;
        }

        )}
      </ul>
    </div>
  );

}


const MemoizedPagination = React.memo(Pagination);

export default MemoizedPagination;
