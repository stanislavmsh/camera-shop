import { useForm , SubmitHandler} from 'react-hook-form';
import { TUserReview } from '../../types/review';
import { STARS_RATING } from '../../utils/const';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { sendReviewAction } from '../../store/current-data/current-data.action';


type ReviewFormProps = {
  cameraId: number;
  handleCloseForm: () => void;
  handleNavigateToSuccess: () => void;
}


export default function ReviewForm({ handleCloseForm , cameraId, handleNavigateToSuccess} : ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  const nameRegExp = new RegExp('[A-Za-zА-Яа-яЁё\\s\'\\-]+');

  const [currentRating, setCurrentRating] = useState(0);

  const {register , handleSubmit, formState: { errors } , reset} = useForm<TUserReview>({mode: 'onSubmit', criteriaMode: 'all'});

  const submit: SubmitHandler<TUserReview> = (data) => {

    const serverData = {...data, rating: Number(data.rating), cameraId: cameraId};
    dispatch(sendReviewAction(serverData)).then(() => {
      setCurrentRating(0);
      handleNavigateToSuccess();
    });

    setTimeout(() => reset(), 300);

  };

  const setCurrentStarTitle = (current: number) => {
    if(current === 1) {
      return 'Ужасно';
    }
    if(current === 2) {
      return 'Плохо';
    }
    if(current === 3) {
      return 'Нормально';
    }
    if(current === 4) {
      return 'Хорошо';
    }
    if(current === 5) {
      return 'Отлично';
    }
  };


  return(

    <div className="modal__wrapper">
      <div className="modal__overlay" />
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
                      <>
                        <input
                          key={`star${elem}`}
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
                      </>
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
                    minLength={5}
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
        <button onClick={handleCloseForm} className="cross-btn" type="button" aria-label="Закрыть попап">
          <svg width={10} height={10} aria-hidden="true">
            <use xlinkHref="#icon-close" />
          </svg>
        </button>
      </div>
    </div>

  );

}
