import { useState } from 'react';
import { SortingOption, SortingValues } from '../../utils/const';
import { useAppDispatch } from '../../hooks';
import { sortCatalog } from '../../store/cameras-data/cameras-data.slice';


export default function CatalogSort() {

  const dispatch = useAppDispatch();

  const [currentOption , setCurrentOption] = useState<SortingOption>(SortingOption.HighToLow);
  const [currentValue, setCurrentValue] = useState<SortingValues>(SortingValues.Price);

  const handleValueSwitch = (value: SortingValues) => {
    setCurrentValue(value);
    dispatch(sortCatalog([currentOption, value]));
  };

  const handleOptionClick = (option: SortingOption) => {
    setCurrentOption(option);
    dispatch(sortCatalog([option, currentValue]));
  };


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
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                onClick={() => handleValueSwitch(SortingValues.Rating)}
                type="radio"
                id="sortPopular"
                name="sort"
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
