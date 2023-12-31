import React, { ChangeEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getBackupCameras, getPriceMinMax, getStoredItems } from '../../store/cameras-data/cameras-data.selectors';
import { fetchCamerasByPriceAction } from '../../store/cameras-data/cameras-data.action';
import { useSearchParams } from 'react-router-dom';
import { filterCameras, setPriceMinMax, sortCatalog } from '../../store/cameras-data/cameras-data.slice';
import { FilterCategory, FilterType, FilterLevel, SortingOption, SortingValues, SearchParam } from '../../utils/const';
import { debounce } from '../../utils/utils';

type CatalogFilterPriceProps = {
  minRef :React.MutableRefObject<HTMLInputElement | null>;
  maxRef : React.MutableRefObject<HTMLInputElement | null>;
}


export default function CatalogFilterPrice ({minRef, maxRef} : CatalogFilterPriceProps) {
  const DEBOUNCE_TIME = 600;

  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const sortParams = searchParams.get(SearchParam.Sorting);
  const orderParams = searchParams.get(SearchParam.Order);
  const categoryParam = searchParams.get(SearchParam.Category) as FilterCategory;
  const typeParams = searchParams.getAll(SearchParam.Type) as FilterType[];
  const levelParams = searchParams.getAll(SearchParam.Level) as FilterLevel[];


  const cameras = useAppSelector(getStoredItems);
  const backupCameras = useAppSelector(getBackupCameras);
  const currentMinMax = useAppSelector(getPriceMinMax);
  const lowestPrice = cameras.length > 0 ? Math.min(...cameras.map((camera) => camera.price)) : 0;
  const highestPrice = cameras.length > 0 ? Math.max(...cameras.map((camera) => camera.price)) : 0;

  const defaultMin = backupCameras.length > 0 ? Math.min(...backupCameras.map((camera) => camera.price)) : 0;
  const defaultMax = backupCameras.length > 0 ? Math.max(...backupCameras.map((camera) => camera.price)) : 0;

  const updateCards = ([min, max] : [number, number]) => {
    dispatch(fetchCamerasByPriceAction([min , max])).then(() => {
      dispatch(filterCameras([categoryParam, typeParams, levelParams]));
      if(searchParams.has(SearchParam.Sorting) || searchParams.has(SearchParam.Order)) {
        dispatch(sortCatalog([orderParams as SortingOption || SortingOption.HighToLow, sortParams as SortingValues || SortingValues.Price]));
      }
    });
  };

  useEffect(() => {
    if(minRef.current) {
      minRef.current.value = currentMinMax[0];
    }
    if(maxRef.current) {
      maxRef.current.value = currentMinMax[1];
    }
  },[currentMinMax, maxRef, minRef]);


  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = Number(evt.target.value);
    if (value < 0) {
      evt.target.value = '0';
    }
    if(maxRef.current && minRef.current) {
      if(maxRef.current.value !== '' && Number(maxRef.current.value) < Number(minRef.current.value)) {
        maxRef.current.value = minRef.current.value;
      }
    }
    if (minRef.current) {
      if(value < lowestPrice && evt.target.value !== '') {
        evt.target.value = lowestPrice.toString();
      }
      if(value > highestPrice) {
        evt.target.value = highestPrice.toString();
      }
    }
    if(maxRef.current) {
      if(Number(maxRef.current?.value) > highestPrice) {
        evt.target.value = highestPrice.toString();
      }
      if(maxRef.current?.value !== '' && value < Number(minRef.current?.value)) {
        if(minRef.current) {
          evt.target.value = minRef.current.value;
        }
      }
    }
    const priceServerMax = Number(maxRef.current?.value) || defaultMax;
    const priceServerMin = Number(minRef.current?.value) || defaultMin;
    dispatch(setPriceMinMax([minRef.current?.value || '', maxRef.current?.value || '']));
    updateCards([priceServerMin, priceServerMax]);
    searchParams.set(SearchParam.Page, '1');
    setSearchParams(searchParams);

  };

  const debouncedHandleInputChange = debounce(handleInputChange, DEBOUNCE_TIME);


  return (
    <fieldset data-testid='catalog-filter-price-test' className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="price"
              placeholder={lowestPrice.toString()}
              onChange={debouncedHandleInputChange}
              ref={minRef}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="priceUp"
              placeholder={highestPrice.toString()}
              onChange={debouncedHandleInputChange}
              ref={maxRef}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}
