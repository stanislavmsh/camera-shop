import { useAppSelector } from '../../hooks';
import { getSortedCameras } from '../../store/cameras-data/cameras-data.selectors';

export default function CatalogFilterPrice () {

  const cameras = useAppSelector(getSortedCameras);

  const lowestPrice = cameras.reduce((min, object) => {
    if (object.price < min) {
      min = object.price;
    }
    return min;
  }, cameras[0].price);

  const highestPrice = cameras.reduce((max, object) => {
    if (object.price > max) {
      max = object.price;
    }
    return max;
  }, cameras[0].price);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input type="number"
              name="price"
              placeholder={lowestPrice.toString()}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="priceUp"
              placeholder={highestPrice.toString()}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}
