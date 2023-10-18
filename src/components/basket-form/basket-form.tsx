import { useAppDispatch, useAppSelector } from '../../hooks';
import { ChangeEvent, useState } from 'react';
import { getCouponName, getIsCouponInvalid, getIsCouponValid } from '../../store/basket-data/basket-data.selectors';
import cn from 'classnames';
import { fetchCouponAction } from '../../store/basket-data/basket-data.action';
import './basket-form.css';

type TBasketFormProps = {
  inputRef : React.MutableRefObject<HTMLInputElement | null>;
}


export default function BasketForm({inputRef} : TBasketFormProps) : JSX.Element {

  const dispatch = useAppDispatch();

  const isCouponInvalid = useAppSelector(getIsCouponInvalid);
  const isCouponValid = useAppSelector(getIsCouponValid);
  const couponName = useAppSelector(getCouponName);
  const [currentValue, setCurrentValue] = useState<string>(couponName || '');

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newValue = evt.target.value.replace(/\s/g, '');
    setCurrentValue(newValue);
  };

  const handleCouponCheck = () => {
    if(currentValue.length !== 0) {
      dispatch(fetchCouponAction(currentValue));
    }
  };


  return (
    <div className="basket-form">
      <form action="#">
        <div className={cn('custom-input',
          {
            'is-invalid' : isCouponInvalid ,
            'is-valid' : isCouponValid
          })}
        >
          <label>
            <span className="custom-input__label">Промокод</span>
            <input
              type="text"
              name="promo"
              placeholder="Введите промокод"
              value={currentValue}
              onChange={handleInputChange}
              ref={inputRef}
            />
          </label>
          <p className="custom-input__error">Промокод неверный</p>
          <p className="custom-input__success">Промокод принят!</p>
        </div>
        <button onClick={handleCouponCheck} className="btn" type="button">
                    Применить
        </button>
      </form>
    </div>
  );
}


// is-invalid | is-valid
