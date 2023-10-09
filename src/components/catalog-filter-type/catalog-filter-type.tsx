import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterCategory , FilterType, SearchParam} from '../../utils/const';

export default function CatalogFilterType() : JSX.Element {

  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get(SearchParam.Category) as FilterCategory;
  const typeParams = searchParams.getAll(SearchParam.Type) as FilterType[];

  const handleTypeClick = (evt : ChangeEvent<HTMLInputElement>) => {
    const currentName = evt.target.name;
    const isChecked = evt.target.checked;

    if(isChecked) {
      searchParams.append(SearchParam.Type, currentName);
    }
    if(!isChecked) {
      searchParams.delete(SearchParam.Type, currentName);
    }
    searchParams.set('page', '1');
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
            checked={typeParams.includes(FilterType.Digital)}
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
            disabled={categoryParam === FilterCategory.Video}
            onChange={handleTypeClick}
            checked={typeParams.includes(FilterType.Film)}
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
            disabled={categoryParam === FilterCategory.Video}
            onChange={handleTypeClick}
            checked={typeParams.includes(FilterType.Momental)}
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
            checked={typeParams.includes(FilterType.Collection)}
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
