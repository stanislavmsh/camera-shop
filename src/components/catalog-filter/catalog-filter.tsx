import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef} from 'react';
import CatalogFilterPrice from '../catalog-filter-price/catalog-filter-price';
import CatalogFilterCategory from '../catalog-filter-category/catalog-filter-category';
import CatalogFilterType from '../catalog-filter-type/catalog-filter-type';
import CatalogFilterLevel from '../catalog-filter-level/catalog-filter-level';
import { filterCameras, resetCameras } from '../../store/cameras-data/cameras-data.slice';
import { useAppDispatch } from '../../hooks';
import { FilterCategory, FilterLevel, FilterType } from '../../utils/const';


export default function CatalogFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const minRef = useRef<HTMLInputElement | null>(null);
  const maxRef = useRef<HTMLInputElement | null>(null);

  const orderParams = searchParams.get('order');
  const sortParams = searchParams.get('sort');
  const categoryParam = searchParams.get('category') as FilterCategory;
  const typeParams = searchParams.getAll('type') as FilterType[];
  const levelParams = searchParams.getAll('level') as FilterLevel[];

  const handleResetClick = () => {
    if(orderParams || sortParams || categoryParam || typeParams || levelParams) {
      searchParams.delete('type');
      searchParams.delete('category');
      searchParams.delete('level');
      searchParams.delete('sort');
      searchParams.delete('order');
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
        searchParams.delete('level', invalidLevel);
      });
      setSearchParams(searchParams);
    }
    if (invalidTypes.length > 0) {
      invalidTypes.forEach((type) => {
        searchParams.delete('type', type);
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
