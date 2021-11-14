import ReviewsItem from '../reviews-item/reviews-item';
import ReviewsListProps from './type';

function ReviewsList ({reviews}: ReviewsListProps): JSX.Element {
  const sortReviews = (
    [...reviews]
      .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
      .slice(0, 10)
  );
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {sortReviews.map((review) => (
          <ReviewsItem key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
}

export default ReviewsList;
