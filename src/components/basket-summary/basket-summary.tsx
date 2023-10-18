import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sendOrderAction } from '../../store/basket-data/basket-data.action';
import { getChangedBasketItems, getCouponName, getCouponValue } from '../../store/basket-data/basket-data.selectors';
import { TOrder } from '../../types/order';
import { formatNumberWithSpace } from '../../utils/utils';
import BasketForm from '../basket-form/basket-form';


export default function BasketSummary() : JSX.Element {

  const dispatch = useAppDispatch();
  const basketItems = useAppSelector(getChangedBasketItems);
  const couponValue = useAppSelector(getCouponValue);
  const couponName = useAppSelector(getCouponName);
  const serverIds = basketItems.map((elem) => elem.id);

  const priceWithoutDiscount = basketItems.reduce((acc , value) => acc + value.price , 0);
  const discountValue = Math.round(priceWithoutDiscount * couponValue / 100);
  const priceWithDiscount = priceWithoutDiscount - discountValue;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOrder = () => {
    const serverData : TOrder = {camerasIds: serverIds, coupon: couponName };
    dispatch(sendOrderAction(serverData)).then(() => {
      if(inputRef.current) {
        inputRef.current.value = '';
      }
    });
  };


  return (
    <div data-testid='basket-summary-test' className="basket__summary">
      <div className="basket__promo">
        <p className="title title--h4">
                Если у вас есть промокод на скидку, примените его в этом поле
        </p>
        <BasketForm inputRef={inputRef}/>
      </div>
      <div className="basket__summary-order">
        <p className="basket__summary-item">
          <span className="basket__summary-text">Всего:</span>
          <span className="basket__summary-value">{formatNumberWithSpace(priceWithoutDiscount)} ₽</span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text">Скидка:</span>
          <span className={`basket__summary-value ${discountValue !== 0 ? 'basket__summary-value--bonus' : ''}` }>
            {formatNumberWithSpace((discountValue))} ₽
          </span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text basket__summary-text--total">
                  К оплате:
          </span>
          <span className="basket__summary-value basket__summary-value--total">
            {formatNumberWithSpace(priceWithDiscount)} ₽
          </span>
        </p>
        <button onClick={handleOrder} disabled={basketItems.length === 0} className="btn btn--purple" type="button">
                Оформить заказ
        </button>
      </div>
    </div>
  );

}

//basket__summary-value--bonus
