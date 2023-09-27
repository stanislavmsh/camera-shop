import React, {useState, useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCameras } from '../../store/cameras-data/cameras-data.selectors';
import { useSearchParams } from 'react-router-dom';
import usePagination from '@mui/material/usePagination';
import { sortShownItems } from '../../store/cameras-data/cameras-data.slice';
import styles from '/src/components/pagination/pagination.module.css';

function Pagination() : JSX.Element {
  const dispatch = useAppDispatch();

  const [searchParams , setSearchParams] = useSearchParams();
  const PRODUCTS_PER_PAGE = 9;
  const camerasList = useAppSelector(getCameras);
  const pageCount = Math.ceil(camerasList.length / PRODUCTS_PER_PAGE);
  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const safePage = pageFromUrl > pageCount ? pageCount : pageFromUrl;


  const [currentPages , setCurrentPages] = useState({
    paginationMin: 0,
    paginationMax: 3,
  });

  const { items } = usePagination({
    count: pageCount,
    hideNextButton: currentPages.paginationMax >= pageCount,
    hidePrevButton: currentPages.paginationMax <= 3,
    page: safePage,
    siblingCount: 2,
  });

  useEffect(() => {

    const start = (safePage - 1) * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;
    if (safePage === 1) {
      setCurrentPages({
        paginationMin: 0,
        paginationMax: 3,
      });
    }
    dispatch(sortShownItems([start, end]));
    if(pageFromUrl > pageCount) {
      setSearchParams({page: safePage.toString()});
    }
  }, [safePage , dispatch , pageCount, pageFromUrl, setSearchParams]);

  const handleNextClick = (type: 'next' | 'previous') => {
    setCurrentPages((prevPages) => {
      const step = type === 'next' ? 3 : -3;

      return {
        ...prevPages,
        paginationMax: prevPages.paginationMax + step,
        paginationMin: prevPages.paginationMin + step,
      };
    });

    setSearchParams({
      page: type === 'next' ? (currentPages.paginationMax + 1).toString() : currentPages.paginationMin.toString()
    });
  };

  const handlePageClick = (page : number) => {
    setSearchParams({ page: page.toString() });
  };

  const isLinkedPageInRange = safePage === 1 || safePage <= currentPages.paginationMax && safePage > currentPages.paginationMin;

  if(!isLinkedPageInRange) {
    setCurrentPages((prevPages) => {
      const step = 3;

      return {
        ...prevPages,
        paginationMax: prevPages.paginationMax + step,
        paginationMin: prevPages.paginationMin + step,
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
                  className = {`${styles['pagination__button']} pagination__link pagination__link--text`}
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
