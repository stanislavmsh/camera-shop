import { useSearchParams } from 'react-router-dom';
import { ChangeEvent } from 'react';
import { FilterLevel, SearchParam } from '../../utils/const';


export default function CatalogFilterLevel(): JSX.Element {

  const [searchParams, setSearchParams] = useSearchParams();

  const levelParams = searchParams.getAll(SearchParam.Level);

  const handleLevelClick = (evt : ChangeEvent<HTMLInputElement>) => {
    const currentName = evt.target.name;
    const isChecked = evt.target.checked;

    if(isChecked) {
      searchParams.append(SearchParam.Level, currentName);
    }
    if(!isChecked) {
      searchParams.delete(SearchParam.Level, currentName);
    }
    searchParams.set(SearchParam.Page, '1');
    setSearchParams(searchParams);

  };

  return (
    <fieldset data-testid="catalog-filter-level-test" className="catalog-filter__block">
      <legend className="title title--h5">Уровень</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox"
            name={FilterLevel.Zero}
            onChange={handleLevelClick}
            checked={levelParams.includes(FilterLevel.Zero)}
          />
          <span className="custom-checkbox__icon" />
          <span className="custom-checkbox__label">Нулевой</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            type="checkbox"
            name={FilterLevel.Newbie}
            onChange={handleLevelClick}
            checked={levelParams.includes(FilterLevel.Newbie)}
          />
          <span className="custom-checkbox__icon" />
          <span className="custom-checkbox__label">
                          Любительский
          </span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            type="checkbox"
            name={FilterLevel.Pro}
            onChange={handleLevelClick}
            checked={levelParams.includes(FilterLevel.Pro)}
          />
          <span className="custom-checkbox__icon" />
          <span className="custom-checkbox__label">
                          Профессиональный
          </span>
        </label>
      </div>
    </fieldset>
  );
}
