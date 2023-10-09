import { useSearchParams } from 'react-router-dom';
import { ChangeEvent } from 'react';


export default function CatalogFilterLevel(): JSX.Element {

  const [searchParams, setSearchParams] = useSearchParams();

  const levelParams = searchParams.getAll('level');

  const handleLevelClick = (evt : ChangeEvent<HTMLInputElement>) => {
    const currentName = evt.target.name;
    const isChecked = evt.target.checked;

    if(isChecked) {
      searchParams.append('level', currentName);
    }
    if(!isChecked) {
      searchParams.delete('level', currentName);
    }
    searchParams.set('page', '1');
    setSearchParams(searchParams);

  };

  return (
    <fieldset data-testid="catalog-filter-level-test" className="catalog-filter__block">
      <legend className="title title--h5">Уровень</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox"
            name="Нулевой"
            onChange={handleLevelClick}
            checked={levelParams.includes('Нулевой')}
          />
          <span className="custom-checkbox__icon" />
          <span className="custom-checkbox__label">Нулевой</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            type="checkbox"
            name="Любительский"
            onChange={handleLevelClick}
            checked={levelParams.includes('Любительский')}
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
            name="Профессиональный"
            onChange={handleLevelClick}
            checked={levelParams.includes('Профессиональный')}
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
