import {
  useState,
  ChangeEvent,
  MouseEvent,
  FormEvent,
  useEffect,
  Fragment
} from 'react';
import {
  connect,
  ConnectedProps,
  useDispatch
} from 'react-redux';

import { sendCommentAction } from '../../store/api-actions';
import {
  LoadCommentsStatus,
  MIN_COMMENT_LENGTH,
  MAX_COMMENT_LENGTH,
  Ratings
} from '../../const';
import { State } from '../../types/state';

const mapStateToProps = ({comments, isCommentPosted}: State) => ({
  comments,
  isCommentPosted,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type FormCommentProps = {
  id: string,
}

function FormComment ({id, comments, isCommentPosted}: PropsFromRedux & FormCommentProps): JSX.Element {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const [errorForm, setErrorForm] = useState(true);

  const dispatch = useDispatch();

  const onSubmitHandle = (evt: FormEvent) => {
    evt.preventDefault();
    if (!errorForm) {
      dispatch(sendCommentAction({comment, rating}, id));
    }
  };

  const validateForm = (ratingValue : string, commentValue : string) => {
    if (
      commentValue.length < 50 ||
      ratingValue === ''
    ) {
      setErrorForm(true);
      return;
    }
    setErrorForm(false);
  };

  useEffect(() => {
    validateForm(rating, comment);
  }, [rating, comment]);

  useEffect(() => {
    if (isCommentPosted === LoadCommentsStatus.Posted) {
      setComment('');
      setRating('');
    }
  }, [isCommentPosted]);


  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={onSubmitHandle}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Ratings.map(({title, value}) => (
          <Fragment key={`${title}${value}`}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              onClick={
                ({target}: MouseEvent<HTMLInputElement>) => {
                  const ratingInput = target as HTMLInputElement;
                  setRating(ratingInput.value);
                }
              }
              data-rating={rating}
              disabled={isCommentPosted === LoadCommentsStatus.Loading}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg
                className="form__star-image"
                width="37"
                height="33"
              >
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange = {
          ({target}: ChangeEvent<HTMLTextAreaElement>) => {
            setComment(target.value);
          }
        }
        value = {comment}
        minLength = {MIN_COMMENT_LENGTH}
        maxLength = {MAX_COMMENT_LENGTH}
        disabled={isCommentPosted === LoadCommentsStatus.Loading}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{MIN_COMMENT_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={errorForm || isCommentPosted === LoadCommentsStatus.Loading}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export {FormComment};
export default connector(FormComment);
