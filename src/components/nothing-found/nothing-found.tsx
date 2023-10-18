import './nothing-found.css';

export default function NothingFound() :JSX.Element {
  return (
    <div data-testid='nothing-found-test' className="nothing__found">
      <p className="title title--h2">По Вашему запросу ничего не найдено</p>
    </div>
  );
}
