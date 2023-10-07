import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import CatalogFilterPrice from '../catalog-filter-price/catalog-filter-price';
import CatalogFilterCategory from '../catalog-filter-category/catalog-filter-category';
import CatalogFilterType from '../catalog-filter-type/catalog-filter-type';
import CatalogFilterLevel from '../catalog-filter-level/catalog-filter-level';
import { filterCameras } from '../../store/cameras-data/cameras-data.slice';
import { useAppDispatch } from '../../hooks';
import { FilterCategory, FilterLevel, FilterType } from '../../utils/const';


export default function CatalogFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const handleResetClick = () => {
    searchParams.delete('type');
    searchParams.delete('category');
    searchParams.delete('level');
    setSearchParams(searchParams);
  };

  const categoryParam = searchParams.get('category') as FilterCategory;
  const typeParams = searchParams.getAll('type') as FilterType[];
  const levelParams = searchParams.getAll('level') as FilterLevel[];

  useEffect(() => {
    dispatch(filterCameras([categoryParam, typeParams, levelParams]));
  },[categoryParam, dispatch, levelParams, typeParams]);


  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <CatalogFilterPrice />
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
