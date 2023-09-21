import React , {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCameras } from '../../store/cameras-data/cameras-data.selectors';
import { useSearchParams } from 'react-router-dom';
import usePagination from '@mui/material/usePagination';
import { sortShownItems } from '../../store/cameras-data/cameras-data.slice';
import styles from './pagination.module.css';

function Pagination() : JSX.Element {
  const dispatch = useAppDispatch();

  // const [searchParams , setSearchParams] = useSearchParams();
  const PRODUCTS_PER_PAGE = 6;
  const camerasList = useAppSelector(getCameras);
  const pageCount = Math.ceil(camerasList.length / PRODUCTS_PER_PAGE);

  // const page = searchParams.get('page') ?? '1';

  // const start = (Number(page) - 1) * PRODUCTS_PER_PAGE;
  // const end = start + PRODUCTS_PER_PAGE;


  const { items } = usePagination({
    count: pageCount,
    hideNextButton: false,
    hidePrevButton: false,
    boundaryCount: 1,
    siblingCount: 0,
    onChange(evt, page) {
      evt.preventDefault();
      const start = (Number(page) - 1) * PRODUCTS_PER_PAGE;
      const end = start + PRODUCTS_PER_PAGE;
      dispatch(sortShownItems([start, end]));
    },
  });


  let defaultFirst = 0;
  let defaultLast = 3;
  const step = 3;

  let shownNumbers = items;
  const showNextNumbers = () => {
    defaultFirst += step;
    defaultLast += step;
    shownNumbers = items.slice(defaultFirst, defaultLast);
    console.log(shownNumbers);
  };

  const showLastNumbers = () => {

  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {items.length > 3 &&
        <li className="pagination__item">
          <button
            className="pagination__link pagination__link--text"
            onClick={showLastNumbers}
          >
                      Назад
          </button>
        </li>}
        {shownNumbers.map(({ page, type, selected, ...item }) => (
          <li key={`${page as number}${type}keyss`} className="pagination__item">
            <button
              className={`pagination__link ${styles['pagination__button']} ${selected ? 'pagination__link--active' : ''}`}
              {...item}
            >
              {page}
            </button>
          </li>

        ))}
        { items.length > 3 &&
        <li className="pagination__item">
          <button
            className="pagination__link pagination__link--text"
            onClick={showNextNumbers}
          >
                      Далее
          </button>
        </li>}
      </ul>
    </div>
  );

}


const MemoizedPagination = React.memo(Pagination);

export default MemoizedPagination;
