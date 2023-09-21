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
    boundaryCount: 0,
    siblingCount: 0,
    onChange(evt, page) {
      evt.preventDefault();
      const start = (Number(page) - 1) * PRODUCTS_PER_PAGE;
      const end = start + PRODUCTS_PER_PAGE;
      dispatch(sortShownItems([start, end]));
    },
  });

  // const showNextNumbers = () => {
  // };

  // const showLastNumbers = () => {

  // };


  const modifiedItems = items.map((item) => {
    if(item.type === 'next') {
      return {
        type: 'next-3',
        page: item.page,
        onClick: item.onClick,
      };
    } else if (item.type === 'previous') {
      return {
        type: 'last-3',
        page: item.page,
        onClick: item.onClick
      };

    } else {
      return item;
    }

  });


  return (
    <div className="pagination">
      <ul className="pagination__list">
        {items.map(({ page, type, selected, ...item }) => {
          let children = null;

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = '';
          } else if (type === 'page') {
            children = (
              <li key={`${page as number}${type}keyss`} className="pagination__item">
                <button
                  className={`pagination__link ${styles['pagination__button']} ${selected ? 'pagination__link--active' : ''}`}
                  {...item}
                >
                  {page}
                </button>
              </li>

            );
          } else {
            children = (
              <li className="pagination__item">
                <button
                  className = {`${styles['pagination__button']} pagination__link pagination__link--text`}
                  {...item}
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
