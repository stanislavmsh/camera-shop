import { useForm , SubmitHandler} from 'react-hook-form';
import { TUserReview } from '../../types/review';
import { STARS_RATING , RatingName } from '../../utils/const';
import React, { useState , useRef , useEffect} from 'react';
import { useAppDispatch } from '../../hooks';
import { sendReviewAction } from '../../store/current-data/current-data.action';
import FocusLock from 'react-focus-lock';
import { setFormModalStatus, setSuccessModalStatus } from '../../store/cameras-data/cameras-data.slice';


type ReviewFormProps = {
  cameraId: number;
  handleCloseForm: () => void;
  isActive: boolean;
}


export default function ReviewForm({ handleCloseForm , cameraId , isActive} : ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const RESET_TIMEOUT = 300;

  const {register , handleSubmit, formState: { errors } , reset } = useForm<TUserReview>({mode: 'onSubmit', criteriaMode: 'all'});

  const nameRegExp = new RegExp('[A-Za-zА-Яа-яЁё\\s\'\\-]+');
  const [currentRating, setCurrentRating] = useState(0);


  const submit: SubmitHandler<TUserReview> = (data) => {

    const serverData = {...data, rating: Number(data.rating), cameraId: cameraId};
    dispatch(sendReviewAction(serverData)).then(() => {
      setCurrentRating(0);
    });
    dispatch(setFormModalStatus(false));
    dispatch(setSuccessModalStatus(true));

    setTimeout(() => reset(), RESET_TIMEOUT);

  };

  const focusLockRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isActive && focusLockRef.current) {
      focusLockRef.current.focus();
    }
  }, [isActive]);

  const setCurrentStarTitle = (current: number) => {
    if(current === STARS_RATING[0]) {
      return RatingName.Awful;
    }
    if(current === STARS_RATING[1]) {
      return RatingName.Bad;
    }
    if(current === STARS_RATING[2]) {
      return RatingName.Average;
    }
    if(current === STARS_RATING[3]) {
      return RatingName.Good;
    }
    if(current === STARS_RATING[4]) {
      return RatingName.Perfect;
    }
  };


  return(
    <div className="modal__wrapper">
      <FocusLock group='group-3' returnFocus ref={focusLockRef} >
        <div onClick={handleCloseForm} className="modal__overlay" />
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form
              onSubmit={(evt) => {
                handleSubmit(submit)(evt);
              }}
              method="post"
            >
              <div className="form-review__rate">
                <fieldset className={`rate form-review__item ${errors.rating ? 'is-invalid' : ''}`} >
                  <legend className="rate__caption">
                Рейтинг
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake" />
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">
                      {STARS_RATING.map((elem) => (
                        <React.Fragment key={`star${elem}`}>
                          <input
                            data-testid='star-test'
                            className="visually-hidden"
                            id={`star-${elem}`}
                            type="radio"
                            defaultValue={elem}
                            onClick={() => {
                              setCurrentRating(elem);
                            }}
                            {...register('rating', {required: true, validate: (value) => {
                              const isRatingValid = value > 0;
                              return isRatingValid;
                            }})}
                            aria-invalid= {errors.rating ? 'true' : 'false'}
                          />
                          <label
                            className="rate__label"
                            htmlFor={`star-${elem}`}
                            title={setCurrentStarTitle(elem)}
                          />
                        </React.Fragment>
                      )).reverse()}

                    </div>
                    <div className="rate__progress">
                      <span className="rate__stars">{currentRating}</span> <span>/</span>{' '}
                      <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  <p className="rate__message">Нужно оценить товар</p>
                </fieldset>
                <div className={`custom-input form-review__item ${errors.userName ? 'is-invalid' : ''}`}>
                  <label>
                    <span className="custom-input__label">
                  Ваше имя
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      id='name__input'
                      data-testid="test-name-input"
                      placeholder="Введите ваше имя"
                      {...register('userName', {required: true, validate: (value) => {
                        const isNameValid = nameRegExp.test(value);
                        return isNameValid;
                      }})}
                      aria-invalid= {errors.userName ? 'true' : false}
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать имя</p>
                </div>
                <div className={`custom-input form-review__item ${errors.advantage ? 'is-invalid' : ''}`}>
                  <label>
                    <span className="custom-input__label">
                  Достоинства
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      data-testid="test-adv-input"
                      placeholder="Основные преимущества товара"
                      {...register('advantage', {required: true})}
                      aria-invalid= {errors.advantage ? 'true' : 'false'}
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать достоинства</p>
                </div>
                <div className={`custom-input form-review__item ${errors.disadvantage ? 'is-invalid' : ''}`}>
                  <label>
                    <span className="custom-input__label">
                  Недостатки
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      data-testid="test-dis-input"
                      placeholder="Главные недостатки товара"
                      {...register('disadvantage' , {required: true})}
                      aria-invalid = {errors.disadvantage ? 'true' : 'false'}
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать недостатки</p>
                </div>
                <div className={`custom-textarea form-review__item ${errors.review ? 'is-invalid' : ''}`}>
                  <label>
                    <span className="custom-textarea__label">
                  Комментарий
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <textarea
                      minLength={10}
                      maxLength={160}
                      data-testid="test-text-input"
                      placeholder="Поделитесь своим опытом покупки"
                      defaultValue={''}
                      {...register('review', {required: true})}
                    />
                  </label>
                  <div className="custom-textarea__error">
                Нужно добавить комментарий
                  </div>
                </div>
              </div>
              <button className="btn btn--purple form-review__btn" type="submit">
            Отправить отзыв
              </button>
            </form>
          </div>
          <button data-testid = 'submit-button-test' onClick={handleCloseForm} className="cross-btn" type="button" aria-label="Закрыть попап">
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </FocusLock>
    </div>
  );

}
