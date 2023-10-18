
import { useAppSelector } from '../../hooks';
import { getBasketItems } from '../../store/basket-data/basket-data.selectors';
import BasketItem from '../basket-item/basket-item';
import EmptyBasket from '../empty-basket/empty-basket';


export default function BasketList() : JSX.Element {

  const basketItems = useAppSelector(getBasketItems);

  const uniqueItems = basketItems.filter((item, index , self) => index === self.findIndex((o) => o.id === item.id));

  if(basketItems.length === 0) {
    return <EmptyBasket />;
  }

  return (
    <ul data-testid='basket-list-test' className="basket__list">
      {uniqueItems.map((elem) =>
        <BasketItem key={elem.id} item={elem}/>
      )}
    </ul>
  );
}
