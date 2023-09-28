import { useState, useEffect } from 'react';
import ReviewForm from '../review-form/review-form';
import CommentSuccess from '../comment-success/comment-success';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentInfo } from '../../store/current-data/current-data.selectors';
import { fetchCurrentAction, fetchReviewsAction } from '../../store/current-data/current-data.action';
import { FOCUS_TIMEOUT } from '../../utils/const';

type ModalCommentProps = {
  isActive: boolean;
  handleCloseForm: () => void;
}

export default function ModalComment ({isActive, handleCloseForm} : ModalCommentProps): JSX.Element {


  const currentitem = useAppSelector(getCurrentInfo);
  const dispatch = useAppDispatch();

  const [isThanksOpened, setIsThanksOpened] = useState<boolean>(false);

  const handleSuccessClick = () => {
    if(currentitem) {
      dispatch(fetchCurrentAction(currentitem.id));
      dispatch(fetchReviewsAction(currentitem.id)).then(() => {
        handleCloseForm();
        setIsThanksOpened(false);
      });
    }
  };

  const handleNavigateToSuccess = () => {
    setIsThanksOpened(true);
    setTimeout(() => {
      document.getElementById('thanks__button')?.focus();
    }, FOCUS_TIMEOUT);
  };

  useEffect(() => {
    const onEscClick = (evt: KeyboardEvent) => {
      if(evt.code === 'Escape') {
        if(isThanksOpened) {
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


  return(
    <div data-testid='modal-test' className={`modal ${isActive ? 'is-active' : ''} ${isThanksOpened ? 'modal--narrow' : ''}`}>
      {
        !isThanksOpened
          ?
          <ReviewForm handleNavigateToSuccess={handleNavigateToSuccess} cameraId={currentitem?.id || 0} handleCloseForm={handleCloseForm}/>
          :
          <CommentSuccess handleCommentSuccess={handleSuccessClick}/>
      }
    </div>
  );

}
