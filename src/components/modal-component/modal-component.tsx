import { useEffect, useState } from 'react';
import ReviewForm from '../review-form/review-form';
import CommentSuccess from '../comment-success/comment-success';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentInfo } from '../../store/current-data/current-data.selectors';
import { fetchCurrentAction, fetchReviewsAction } from '../../store/current-data/current-data.action';
import ModalBuy from '../modal-buy/modal-buy';
import FocusLock from 'react-focus-lock';
import ModalBasketSuccess from '../modal-basket-success/modal-basket-success';
import { getPurchaseModalStatus, getFormModalStatus, getSuccessModalStatus, getActiveStatus, getBasketModalStatus, getRemovalModalStatus, getOrderModalStatus } from '../../store/modal-process/modal-process.selectors';
import { setActiveStatus } from '../../store/modal-process/modal-process.slice';
import ModalRemoveItem from '../modal-remove-item/modal-remove-item';
import ModalOrderSuccess from '../modal-order-success/modal-order-success';


export default function ModalComponent (): JSX.Element {

  const dispatch = useAppDispatch();

  const [currentElement , setCurrentElement] = useState<JSX.Element | null>(null);

  const isPurchaseOpened = useAppSelector(getPurchaseModalStatus);
  const isFormModalOpened = useAppSelector(getFormModalStatus);
  const isSuccessModalOpened = useAppSelector(getSuccessModalStatus);
  const isBasketModalOpened = useAppSelector(getBasketModalStatus);
  const isRemovalModalOpened = useAppSelector(getRemovalModalStatus);
  const isOrderSuccessOpened = useAppSelector(getOrderModalStatus);

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
      case isBasketModalOpened:
        setCurrentElement(<ModalBasketSuccess />);
        break;
      case isRemovalModalOpened:
        setCurrentElement(<ModalRemoveItem />);
        break;
      case isOrderSuccessOpened:
        setCurrentElement(<ModalOrderSuccess />);
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
  }, [isPurchaseOpened, isFormModalOpened, currentitem?.id, isSuccessModalOpened, dispatch, currentitem, isBasketModalOpened, isRemovalModalOpened, isOrderSuccessOpened]);


  return(
    <FocusLock>
      <div data-testid='modal-test' className={`modal ${isActive ? 'is-active' : ''} ${isSuccessModalOpened || isBasketModalOpened || isOrderSuccessOpened ? 'modal--narrow' : ''}`}>
        {
          currentElement
        }
      </div>
    </FocusLock>
  );

}
