import { useSearchParams } from 'react-router-dom';
import { FilterCategory , FilterType} from '../../utils/const';


export default function CatalogFilterCategory () : JSX.Element {

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const handlePhotoClick = () => {
    if(categoryParam === FilterCategory.Video || categoryParam === null) {
      searchParams.set('category', FilterCategory.Photo);
      searchParams.set('page', '1');
      setSearchParams(searchParams);
    }
    if(categoryParam === FilterCategory.Photo) {
      searchParams.set('page', '1');
      searchParams.delete('category');
      setSearchParams(searchParams);
    }
  };


  const handleVideoClick = () => {
    if(categoryParam === FilterCategory.Photo || categoryParam === null) {
      searchParams.set('category', FilterCategory.Video);
      searchParams.set('page', '1');
      searchParams.delete('type', FilterType.Momental);
      searchParams.delete('type', FilterType.Film);
      setSearchParams(searchParams);
    }
    if(categoryParam === FilterCategory.Video) {
      searchParams.set('page', '1');
      searchParams.delete('category');
      setSearchParams(searchParams);
    }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Категория</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            type="checkbox"
            name="photocamera"
            onChange={handlePhotoClick}
            checked={categoryParam === FilterCategory.Photo}
          />
          <span className="custom-checkbox__icon" />
          <span className="custom-checkbox__label">
                          Фотокамера
          </span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            onChange={handleVideoClick}
            checked={categoryParam === FilterCategory.Video}
            type="checkbox" name="videocamera"
          />
          <span className="custom-checkbox__icon" />
          <span className="custom-checkbox__label">
                          Видеокамера
          </span>
        </label>
      </div>
    </fieldset>
  );
}
