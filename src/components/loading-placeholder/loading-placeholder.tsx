import './loading-placeholder.css';

export default function LoadingPlaceholder() :JSX.Element {
  return (
    <div data-testid='loading-placeholder-test' className="loading__placeholder">
      <p className="title title--h2">ГРУЖУСЬ...</p>
    </div>
  );
}
