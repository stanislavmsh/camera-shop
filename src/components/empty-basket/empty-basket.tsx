import './empty-basket.css';

export default function EmptyBasket() : JSX.Element {
  return (
    <div data-testid='empty-basket-test' className="empty__basket">
      <p className="title title--h2"> Добавьте товары в корзину </p>
    </div>
  );
}
