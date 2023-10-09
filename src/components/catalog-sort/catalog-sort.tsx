import { useEffect } from 'react';
import { SearchParam, SortingOption, SortingValues } from '../../utils/const';
import { useAppDispatch } from '../../hooks';
import { sortCatalog } from '../../store/cameras-data/cameras-data.slice';
import { useSearchParams } from 'react-router-dom';


export default function CatalogSort() {

  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortParams = searchParams.get(SearchParam.Sorting);
  const orderParams = searchParams.get(SearchParam.Order);

  const handleValueSwitch = (value: SortingValues) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(SearchParam.Sorting, value);
    newSearchParams.set(SearchParam.Order, orderParams || SortingOption.HighToLow);

    setSearchParams(newSearchParams);
  };

  const handleOptionClick = (option: SortingOption) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(SearchParam.Sorting, sortParams || SortingValues.Price);
    newSearchParams.set(SearchParam.Order, option);

    setSearchParams(newSearchParams);
  };


  useEffect(() => {
    if(searchParams.has(SearchParam.Sorting) || searchParams.has(SearchParam.Order)) {
      dispatch(sortCatalog([orderParams as SortingOption || SortingOption.HighToLow, sortParams as SortingValues || SortingValues.Price]));
    }
  });


  return (
    <div data-testid='catalog-sort-test' className="catalog-sort">
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
