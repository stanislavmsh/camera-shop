import { useSearchParams } from 'react-router-dom';
import { FilterCategory , FilterType, SearchParam} from '../../utils/const';
import { useEffect } from 'react';


export default function CatalogFilterCategory () : JSX.Element {

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get(SearchParam.Category);

  const handlePhotoClick = () => {
    if(categoryParam === FilterCategory.Video || categoryParam === null) {
      searchParams.set(SearchParam.Category, FilterCategory.Photo);
      searchParams.set(SearchParam.Page, '1');
      setSearchParams(searchParams);
    }
    if(categoryParam === FilterCategory.Photo) {
      searchParams.set(SearchParam.Page, '1');
      searchParams.delete(SearchParam.Category);
      setSearchParams(searchParams);
    }
  };


  const handleVideoClick = () => {
    if(categoryParam === FilterCategory.Photo || categoryParam === null) {
      searchParams.set(SearchParam.Category, FilterCategory.Video);
      searchParams.set(SearchParam.Page, '1');
      searchParams.delete(SearchParam.Type, FilterType.Momental);
      searchParams.delete(SearchParam.Type, FilterType.Film);
      setSearchParams(searchParams);
    }
    if(categoryParam === FilterCategory.Video) {
      searchParams.set(SearchParam.Page, '1');
      searchParams.delete(SearchParam.Category);
      setSearchParams(searchParams);
    }
  };

  useEffect(() => {
    if (
      categoryParam !== FilterCategory.Photo &&
      categoryParam !== FilterCategory.Video
    ) {
      searchParams.delete(SearchParam.Category);
      setSearchParams(searchParams);
    }
  }, [categoryParam, searchParams, setSearchParams]);

  return (
    <fieldset data-testid='filter-category-test' className="catalog-filter__block">
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
