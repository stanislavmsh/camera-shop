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
    dispatch(sortCatalog([sortParams as SortingOption || SortingOption.HighToLow, value]));
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('sort', value);

    setSearchParams(newSearchParams);
  };

  const handleOptionClick = (option: SortingOption) => {
    dispatch(sortCatalog([option, orderParams as SortingValues || SortingValues.Price]));
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('order', option);

    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    const updateSearchParams = (key: string, value: string) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(key, value);
      setSearchParams(newSearchParams);
    };

    if (searchParams.has('sort')) {
      updateSearchParams('sort', searchParams.get('sort') as SortingValues);
    }

    if (searchParams.has('order')) {
      updateSearchParams('order', searchParams.get('order') as SortingOption);
    }
  }, [searchParams, setSearchParams]);


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
                onClick={() => handleValueSwitch(SortingValues.Price)}
                defaultChecked={sortParams === SortingValues.Price}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                onClick={() => handleValueSwitch(SortingValues.Rating)}
                type="radio"
                id="sortPopular"
                name="sort"
                defaultChecked={sortParams === SortingValues.Rating}
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
                onClick={() => handleOptionClick(SortingOption.LowToHigh)}
                defaultChecked={orderParams === SortingOption.LowToHigh}
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
                onClick={() => handleOptionClick(SortingOption.HighToLow)}
                defaultChecked={orderParams === SortingOption.HighToLow}
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
