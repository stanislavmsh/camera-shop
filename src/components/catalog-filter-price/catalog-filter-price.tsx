import { ChangeEvent } from 'react';
import { useAppSelector } from '../../hooks';
import { getFilteredCameras } from '../../store/cameras-data/cameras-data.selectors';


export default function CatalogFilterPrice () {

  const cameras = useAppSelector(getFilteredCameras);

  const lowestPrice = cameras.length > 0 ? Math.min(...cameras.map((camera) => camera.price)) : 0;
  const highestPrice = cameras.length > 0 ? Math.max(...cameras.map((camera) => camera.price)) : 0;

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(evt.target.value);
    if (inputValue < 0) {
      evt.target.value = '0';
    }

  };


  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="price"
              placeholder={lowestPrice.toString()}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="priceUp"
              placeholder={highestPrice.toString()}
              onChange={handleInputChange}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}
