import { useEffect } from 'react';
import { SortingOption, SortingValues } from '../../utils/const';
import { useAppDispatch } from '../../hooks';
import { sortCatalog } from '../../store/cameras-data/cameras-data.slice';
import { useSearchParams } from 'react-router-dom';


export default function CatalogSort() {

  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortParams = searchParams.get('sort');
  const orderParams = searchParams.get('order');

  const handleValueSwitch = (value: SortingValues) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('sort', value);
    newSearchParams.set('order', orderParams || SortingOption.HighToLow);

    setSearchParams(newSearchParams);
  };

  const handleOptionClick = (option: SortingOption) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('sort', sortParams || SortingValues.Price);
    newSearchParams.set('order', option);

    setSearchParams(newSearchParams);
  };


  useEffect(() => {
    if(searchParams.has('sort') || searchParams.has('order')) {
      dispatch(sortCatalog([orderParams as SortingOption || SortingOption.HighToLow, sortParams as SortingValues || SortingValues.Price]));
    }
  });


  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPrice"
                name="sort"
                onChange={() => handleValueSwitch(SortingValues.Price)}
                checked={sortParams === SortingValues.Price}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                onChange={() => handleValueSwitch(SortingValues.Rating)}
                type="radio"
                id="sortPopular"
                name="sort"
                checked={sortParams === SortingValues.Rating}
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="sort-icon"
                aria-label="По возрастанию"
                onChange={() => handleOptionClick(SortingOption.LowToHigh)}
                checked={orderParams === SortingOption.LowToHigh}
              />
              <label htmlFor="up">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                name="sort-icon"
                aria-label="По убыванию"
                onChange={() => handleOptionClick(SortingOption.HighToLow)}
                checked={orderParams === SortingOption.HighToLow}
              />
              <label htmlFor="down">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
