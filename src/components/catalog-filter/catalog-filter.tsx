import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef} from 'react';
import CatalogFilterPrice from '../catalog-filter-price/catalog-filter-price';
import CatalogFilterCategory from '../catalog-filter-category/catalog-filter-category';
import CatalogFilterType from '../catalog-filter-type/catalog-filter-type';
import CatalogFilterLevel from '../catalog-filter-level/catalog-filter-level';
import { filterCameras, resetCameras } from '../../store/cameras-data/cameras-data.slice';
import { useAppDispatch } from '../../hooks';
import { FilterCategory, FilterLevel, FilterType, SearchParam } from '../../utils/const';


export default function CatalogFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const minRef = useRef<HTMLInputElement | null>(null);
  const maxRef = useRef<HTMLInputElement | null>(null);

  const orderParams = searchParams.get(SearchParam.Order);
  const sortParams = searchParams.get(SearchParam.Sorting);
  const categoryParam = searchParams.get(SearchParam.Category) as FilterCategory;
  const typeParams = searchParams.getAll(SearchParam.Type) as FilterType[];
  const levelParams = searchParams.getAll(SearchParam.Level) as FilterLevel[];

  const handleResetClick = () => {
    if(orderParams || sortParams || categoryParam || typeParams || levelParams) {
      searchParams.delete(SearchParam.Type);
      searchParams.delete(SearchParam.Category);
      searchParams.delete(SearchParam.Level);
      searchParams.delete(SearchParam.Sorting);
      searchParams.delete(SearchParam.Order);
      dispatch(resetCameras());
      if(maxRef.current) {
        maxRef.current.value = '';
      }
      if(minRef.current) {
        minRef.current.value = '';
      }
      setSearchParams(searchParams);
    }
  };


  useEffect(() => {
    const validLevels = Object.values(FilterLevel);
    const validTypes = Object.values(FilterType);
    const invalidLevels = levelParams.filter((level) => !validLevels.includes(level));
    const invalidTypes = typeParams.filter((type) => !validTypes.includes(type));

    if (invalidLevels.length > 0) {
      invalidLevels.forEach((invalidLevel) => {
        searchParams.delete(SearchParam.Level, invalidLevel);
      });
      setSearchParams(searchParams);
    }
    if (invalidTypes.length > 0) {
      invalidTypes.forEach((type) => {
        searchParams.delete(SearchParam.Type, type);
      });
      setSearchParams(searchParams);
    }

    if(invalidLevels.length === 0 && invalidTypes.length === 0) {
      dispatch(filterCameras([categoryParam, typeParams, levelParams]));
    }
  },[categoryParam, dispatch, levelParams, typeParams, searchParams, setSearchParams]);

  return (
    <div data-testid="catalog-filter-test" className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <CatalogFilterPrice maxRef={maxRef} minRef={minRef}/>
        <CatalogFilterCategory />
        <CatalogFilterType />
        <CatalogFilterLevel />
        <button
          className="btn catalog-filter__reset-btn"
          type="button"
          onClick={handleResetClick}
        >
                    Сбросить фильтры
        </button>
      </form>
    </div>
  );
}
