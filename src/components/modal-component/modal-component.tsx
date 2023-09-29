import { useEffect, useState } from 'react';
import ReviewForm from '../review-form/review-form';
import CommentSuccess from '../comment-success/comment-success';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentInfo } from '../../store/current-data/current-data.selectors';
import { fetchCurrentAction, fetchReviewsAction } from '../../store/current-data/current-data.action';
import ModalBuy from '../modal-buy/modal-buy';
import FocusLock from 'react-focus-lock';
import { getPurchaseModalStatus, getFormModalStatus, getSuccessModalStatus, getActiveStatus } from '../../store/modal-process/modal-process.selectors';
import { setActiveStatus } from '../../store/modal-process/modal-process.slice';


export default function ModalComponent (): JSX.Element {

  const dispatch = useAppDispatch();

  const [currentElement , setCurrentElement] = useState<JSX.Element | null>(null);

  const isPurchaseOpened = useAppSelector(getPurchaseModalStatus);
  const isFormModalOpened = useAppSelector(getFormModalStatus);
  const isSuccessModalOpened = useAppSelector(getSuccessModalStatus);

  const currentitem = useAppSelector(getCurrentInfo);

  const isActive = useAppSelector(getActiveStatus);


  useEffect(() => {
    const handleCloseForm = () => {
      dispatch(setActiveStatus(false));
      document.body.style.overflow = 'unset';
    };
    const handleSuccessClick = () => {
      if(currentitem) {
        dispatch(fetchCurrentAction(currentitem.id));
        dispatch(fetchReviewsAction(currentitem.id)).then(() => {
          handleCloseForm();
        });
      }
    };

    switch (true) {
      case isPurchaseOpened:
        setCurrentElement(<ModalBuy />);
        break;
      case isFormModalOpened:
        setCurrentElement (
          <ReviewForm isActive={isFormModalOpened} cameraId={currentitem?.id || 0} handleCloseForm={handleCloseForm} />
        );
        break;
      case isSuccessModalOpened:
        setCurrentElement (<CommentSuccess handleCommentSuccess={handleSuccessClick} />);
        break;
    }


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
  }, [isPurchaseOpened, isFormModalOpened, currentitem?.id, isSuccessModalOpened, dispatch, currentitem]);


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
