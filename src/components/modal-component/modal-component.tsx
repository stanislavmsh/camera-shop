import { useEffect } from 'react';
import ReviewForm from '../review-form/review-form';
import CommentSuccess from '../comment-success/comment-success';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentInfo } from '../../store/current-data/current-data.selectors';
import { fetchCurrentAction, fetchReviewsAction } from '../../store/current-data/current-data.action';
import ModalBuy from '../modal-buy/modal-buy';
import FocusLock from 'react-focus-lock';
import { getPurchaseModalStatus, getFormModalStatus, getSuccessModalStatus } from '../../store/modal-process/modal-process.selectors';
import { setFormModalStatus, setPurchaseModalStatus, setSuccessModalStatus } from '../../store/modal-process/modal-process.slice';


export default function ModalComponent (): JSX.Element {

  const dispatch = useAppDispatch();


  const handleCloseForm = () => {
    dispatch(setFormModalStatus(false));
    dispatch(setPurchaseModalStatus(false));
    document.body.style.overflow = 'unset';
  };

  const isPurchaseOpened = useAppSelector(getPurchaseModalStatus);
  const isFormModalOpened = useAppSelector(getFormModalStatus);
  const isSuccessModalOpened = useAppSelector(getSuccessModalStatus);

  const currentitem = useAppSelector(getCurrentInfo);

  const handleSuccessClick = () => {
    if(currentitem) {
      dispatch(fetchCurrentAction(currentitem.id));
      dispatch(fetchReviewsAction(currentitem.id)).then(() => {
        handleCloseForm();
        dispatch(setSuccessModalStatus(false));
      });
    }
  };

  const isActive = isPurchaseOpened || isFormModalOpened || isSuccessModalOpened;


  useEffect(() => {
    const onEscClick = (evt: KeyboardEvent) => {
      if(evt.code === 'Escape') {
        if(isSuccessModalOpened) {
          handleSuccessClick();
        } else {
          handleCloseForm();
        }
      }
    };

    document.addEventListener('keydown', onEscClick);

    return () => {
      document.removeEventListener('keydown', onEscClick);
    };
  });

  let currentElement: JSX.Element = <div></div>;

  switch (true) {
    case isPurchaseOpened:
      currentElement = <ModalBuy />;
      break;
    case isFormModalOpened:
      currentElement = (
        <ReviewForm isActive={isFormModalOpened} cameraId={currentitem?.id || 0} handleCloseForm={handleCloseForm} />
      );
      break;
    case isSuccessModalOpened:
      currentElement = <CommentSuccess handleCommentSuccess={handleSuccessClick} />;
      break;
  }


  return(
    <FocusLock>
      <div data-testid='modal-test' className={`modal ${isActive ? 'is-active' : ''} ${isSuccessModalOpened ? 'modal--narrow' : ''}`}>
        {
          currentElement
        }
      </div>
    </FocusLock>
  );

}
