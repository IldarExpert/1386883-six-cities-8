export type Review = (
  {
    comment: string,
    date: string,
    id: number,
    rating: number,
    user: {
      avatarUrl: string,
      id: number,
      isPro: boolean,
      name: string,
    },
  }
);

export type Reviews = Review[];

export type ReviewFromServer = (
  {
    comment: string,
    date: string,
    id: number,
    rating: number,
    user: {
      'avatar_url': string,
      id: number,
      'is_pro': boolean,
      name: string,
    },
  }
);

export type ReviewsFromServer = ReviewFromServer[];

export type CommentData = {
  comment: string,
  rating: string,
};
