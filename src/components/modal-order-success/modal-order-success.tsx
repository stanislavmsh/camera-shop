import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { setActiveStatus, setOrderSuccessModalStatus } from '../../store/modal-process/modal-process.slice';
import { AppRoute } from '../../utils/const';


export default function ModalOrderSuccess() : JSX.Element {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const MODAL_CLOSE_TIME = 500;

  const handleModalClose = () => {
    dispatch(setActiveStatus(false));
    setTimeout(() => {
      dispatch(setOrderSuccessModalStatus(false));
    }, MODAL_CLOSE_TIME);

    document.body.style.overflow = 'unset';
  };

  const handleBackToShopping = () => {
    handleModalClose();
    navigate(AppRoute.Root);

  };


  return(
    <div data-testid='modal-order-success-test' className="modal__wrapper">
      <div onClick={handleModalClose} className="modal__overlay" />
      <div className="modal__content">
        <p className="title title--h4">Спасибо за покупку</p>
        <svg className="modal__icon" width={80} height={78} aria-hidden="true">
          <use xlinkHref="#icon-review-success" />
        </svg>
        <div className="modal__buttons">
          <button
            className="btn btn--purple modal__btn modal__btn--fit-width"
            type="button"
            onClick={handleBackToShopping}
          >
          Вернуться к покупкам
          </button>
        </div>
        <button onClick={handleModalClose} className="cross-btn" type="button" aria-label="Закрыть попап">
          <svg width={10} height={10} aria-hidden="true">
            <use xlinkHref="#icon-close" />
          </svg>
        </button>
      </div>
    </div>
  );
}
