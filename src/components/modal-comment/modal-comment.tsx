import { useState } from 'react';
import ReviewForm from '../review-form/review-form';
import CommentSuccess from '../comment-success/comment-success';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentInfo } from '../../store/current-data/current-data.selectors';
import { fetchReviewsAction } from '../../store/current-data/current-data.action';

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
      dispatch(fetchReviewsAction(currentitem.id)).then(() => {
        handleCloseForm();
        setIsThanksOpened(false);
      });
    }
  };

  const handleNavigateToSuccess = () => {
    setIsThanksOpened(true);
  };

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
