import { ChangeEvent , useRef} from 'react';
import { useAppSelector } from '../../hooks';
import { getFilteredCameras } from '../../store/cameras-data/cameras-data.selectors';
import { FocusEvent } from 'react';


export default function CatalogFilterPrice () {

  const cameras = useAppSelector(getFilteredCameras);

  const lowestPrice = cameras.length > 0 ? Math.min(...cameras.map((camera) => camera.price)) : 0;
  const highestPrice = cameras.length > 0 ? Math.max(...cameras.map((camera) => camera.price)) : 0;
  const minRef = useRef<HTMLInputElement | null>(null);
  const maxRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(evt.target.value);
    if (inputValue < 0) {
      evt.target.value = '0';
    }
    if(maxRef.current && minRef.current) {
      if(maxRef.current?.value < minRef.current?.value) {
        maxRef.current.value = minRef.current.value;
      }
    }


  };


  const handleInputBlur = (evt: FocusEvent<HTMLInputElement>) => {
    const value = Number(evt.target.value);
    if (minRef) {
      if(value < lowestPrice && evt.target.value !== '') {
        evt.target.value = lowestPrice.toString();
      }
      if(value > highestPrice) {
        evt.target.value = highestPrice.toString();
      }
    }
    if(maxRef) {
      if(value > highestPrice) {
        evt.target.value = highestPrice.toString();
      }
      if(value < Number(minRef.current?.value) && evt.target.value !== '') {
        evt.target.value = (minRef.current as HTMLInputElement).value;
      }
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
              onBlur={handleInputBlur}
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
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              ref={maxRef}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}
