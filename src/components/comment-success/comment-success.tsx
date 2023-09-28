import {useRef , useEffect} from 'react';


type CommentSuccessProps = {
  handleCommentSuccess: () => void;
}


export default function CommentSuccess({handleCommentSuccess}: CommentSuccessProps): JSX.Element {


  const backButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleFocusSwitch = (evt: KeyboardEvent) => {
    if (evt.key === 'Tab') {
      evt.preventDefault();

      if (document.activeElement === backButtonRef.current) {
        closeButtonRef.current?.focus();
      } else {
        backButtonRef.current?.focus();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleFocusSwitch);

    if (backButtonRef.current) {
      backButtonRef.current.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleFocusSwitch);
    };
  });


  return (
    <div className="modal__wrapper">
      <div onClick={handleCommentSuccess} className="modal__overlay" />
      <div className="modal__content">
        <p className="title title--h4">Спасибо за отзыв</p>
        <svg className="modal__icon" width={80} height={78} aria-hidden="true">
          <use xlinkHref="#icon-review-success" />
        </svg>
        <div className="modal__buttons">
          <button
            onClick={handleCommentSuccess}
            className="btn btn--purple modal__btn modal__btn--fit-width"
            type="button"
            id="thanks__button"
            ref={backButtonRef}
          >
          Вернуться к покупкам
          </button>
        </div>
        <button
          onClick={handleCommentSuccess}
          className="cross-btn"
          type="button"
          aria-label="Закрыть попап"
          ref={closeButtonRef}
        >
          <svg width={10} height={10} aria-hidden="true">
            <use xlinkHref="#icon-close" />
          </svg>
        </button>
      </div>
    </div>
  );
}
