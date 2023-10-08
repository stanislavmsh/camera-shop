import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import CatalogFilterPrice from '../catalog-filter-price/catalog-filter-price';
import CatalogFilterCategory from '../catalog-filter-category/catalog-filter-category';
import CatalogFilterType from '../catalog-filter-type/catalog-filter-type';
import CatalogFilterLevel from '../catalog-filter-level/catalog-filter-level';
import { filterCameras } from '../../store/cameras-data/cameras-data.slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { FilterCategory, FilterLevel, FilterType } from '../../utils/const';
import { fetchCamerasByPriceAction } from '../../store/cameras-data/cameras-data.action';
import { getBackupCameras } from '../../store/cameras-data/cameras-data.selectors';


export default function CatalogFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const minRef = useRef<HTMLInputElement | null>(null);
  const maxRef = useRef<HTMLInputElement | null>(null);

  const backupCams = useAppSelector(getBackupCameras);
  const lowestPrice = backupCams.length > 0 ? Math.min(...backupCams.map((camera) => camera.price)) : 0;
  const highestPrice = backupCams.length > 0 ? Math.max(...backupCams.map((camera) => camera.price)) : 0;

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
      dispatch(fetchCamerasByPriceAction([lowestPrice, highestPrice]));
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
    dispatch(filterCameras([categoryParam, typeParams, levelParams]));
  },[categoryParam, dispatch, levelParams, typeParams]);


  return (
    <div className="catalog-filter">
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
