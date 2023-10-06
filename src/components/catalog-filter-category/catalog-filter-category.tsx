// import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../../hooks';
import { FilterCategory , FilterType} from '../../utils/const';
// import { getCameras, getSortedCameras } from '../../store/cameras-data/cameras-data.selectors';
// import { setNewSortedCameras } from '../../store/cameras-data/cameras-data.slice';


export default function CatalogFilterCategory () : JSX.Element {
  // const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  // const cameras = useAppSelector(getSortedCameras);
  // const array = [...cameras.filter((elem) => {
  //   if(categoryParam === FilterCategory.Photo) {
  //     return elem.category === 'Фотоаппарат';
  //   }
  //   return elem.category === categoryParam;
  // }
  // )];

  // console.log(array);

  // useEffect(() => {
  //   dispatch(setNewSortedCameras(array));

  // }, [dispatch, cameras , categoryParam]);

  const handlePhotoClick = () => {
    if(categoryParam === FilterCategory.Video || categoryParam === null) {
      searchParams.set('category', FilterCategory.Photo);
      setSearchParams(searchParams);
    }
    if(categoryParam === FilterCategory.Photo) {
      searchParams.delete('category');
      setSearchParams(searchParams);
    }
  };

  // console.log(categoryParam);

  const handleVideoClick = () => {
    if(categoryParam === FilterCategory.Photo || categoryParam === null) {
      searchParams.set('category', FilterCategory.Video);
      searchParams.delete('type', FilterType.Momental);
      searchParams.delete('type', FilterType.Film);
      setSearchParams(searchParams);
    }
    if(categoryParam === FilterCategory.Video) {
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
