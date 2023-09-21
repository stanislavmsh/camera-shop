import React, {useState, useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCameras } from '../../store/cameras-data/cameras-data.selectors';
// import { useSearchParams } from 'react-router-dom';
import usePagination from '@mui/material/usePagination';
import { sortShownItems } from '../../store/cameras-data/cameras-data.slice';
import styles from './pagination.module.css';

function Pagination() : JSX.Element {
  const dispatch = useAppDispatch();

  // const [searchParams , setSearchParams] = useSearchParams();
  const PRODUCTS_PER_PAGE = 4;
  const camerasList = useAppSelector(getCameras);
  const pageCount = Math.ceil(camerasList.length / PRODUCTS_PER_PAGE);

  // const page = searchParams.get('page') ?? '1';

  // const start = (Number(page) - 1) * PRODUCTS_PER_PAGE;
  // const end = start + PRODUCTS_PER_PAGE;

  const [currentPages , setCurrentPages] = useState({
    paginationMin: 0,
    paginationMax: 3,
    currentSelected: 1,
  });


  const { items } = usePagination({
    count: pageCount,
    hideNextButton: currentPages.paginationMax >= pageCount,
    hidePrevButton: currentPages.paginationMax <= 3,
    page: currentPages.currentSelected,
    siblingCount: 2,
  });

  useEffect(() => {
    const start = (currentPages.currentSelected - 1) * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;
    dispatch(sortShownItems([start, end]));

  }, [currentPages.currentSelected , dispatch]);


  const handleNextClick = (type: 'next' | 'previous') => {
    setCurrentPages((prevPages) => {
      if (type === 'next') {
        return {
          ...prevPages,
          paginationMax: prevPages.paginationMax + 3,
          paginationMin: prevPages.paginationMin + 3,
          currentSelected: prevPages.paginationMax + 1,
        };
      } else {
        return {
          ...prevPages,
          paginationMax: prevPages.paginationMax - 3,
          paginationMin: prevPages.paginationMin - 3,
          currentSelected: prevPages.paginationMin ,
        };
      }
    });
    console.log(currentPages.currentSelected);

  };

  const handlePageClick = (page : number) => {
    setCurrentPages((prev) => ({
      ...prev,
      currentSelected: page
    }));

    console.log(currentPages.currentSelected);
  };


  return (
    <div className="pagination">
      <ul className="pagination__list">
        {items.map(({ page, type, selected }) => {
          let children = null;

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = '';
          }
          if (type === 'page' && page as number <= currentPages.paginationMax && page as number > currentPages.paginationMin) {
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

              <li key={page} className="pagination__item">
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
