import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { CardList, CardOne } from '../../types/cardInfo';
import { Reviews } from '../../types/reviews';

export const getOneOffer = (state: State): CardOne => state[NameSpace.offer].oneOffer;
export const getNearbyOffers = (state: State): CardList => state[NameSpace.offer].nearbyOffers;
export const getComments = (state: State): Reviews => state[NameSpace.offer].comments;
export const getLoadOneOfferError = (state: State): boolean => state[NameSpace.offer].loadOneOfferError;
export const getIsCommentPosted = (state:State): string => state[NameSpace.offer].isCommentPosted;
