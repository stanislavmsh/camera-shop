import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function CatalogFilterType() : JSX.Element {

  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category');
  const typeParams = searchParams.getAll('type');

  const handleTypeClick = (evt : ChangeEvent<HTMLInputElement>) => {
    const currentName = evt.target.name;
    const isChecked = evt.target.checked;

    if(isChecked) {
      searchParams.append('type', currentName);
    }
    if(!isChecked) {
      searchParams.delete('type', currentName);
    }
    setSearchParams(searchParams);

  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Тип камеры</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            type="checkbox"
            name="Цифровая"
            onChange={handleTypeClick}
            checked={typeParams.includes('Цифровая')}
          />
          <span className="custom-checkbox__icon" />
          <span className="custom-checkbox__label">Цифровая</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            type="checkbox"
            name="Плёночная"
            disabled={categoryParam === 'video'}
            onChange={handleTypeClick}
            checked={typeParams.includes('Плёночная')}
          />
          <span className="custom-checkbox__icon" />
          <span className="custom-checkbox__label">
                          Плёночная
          </span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            type="checkbox"
            name="Моментальная"
            disabled={categoryParam === 'video'}
            onChange={handleTypeClick}
            checked={typeParams.includes('Моментальная')}
          />
          <span className="custom-checkbox__icon" />
          <span className="custom-checkbox__label">
                          Моментальная
          </span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            type="checkbox"
            name="Коллекционная"
            onChange={handleTypeClick}
            checked={typeParams.includes('Коллекционная')}
          />
          <span className="custom-checkbox__icon" />
          <span className="custom-checkbox__label">
                          Коллекционная
          </span>
        </label>
      </div>
    </fieldset>
  );
}
