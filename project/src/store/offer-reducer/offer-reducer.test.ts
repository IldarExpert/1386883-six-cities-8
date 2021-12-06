import { offerReducer, initialState } from './offer-reducer';
import { loadOneOffer, loadNearby, updateNearby } from '../action';
import { fakeOfferFromServer, fakeOffer, fakeOffers, fakeOffersFromServer, fakeOffersWithFavoritesStatus } from '../../utils/mocks';

const oneOfferFromServer = fakeOfferFromServer;
const oneOffer = fakeOffer;
const state = initialState;
const stateWhithNearbyOffers = {...state, nearbyOffers: fakeOffers};
describe ('Reducer: offerReducer', () => {
  it('should upload offer data from server', () => {
    expect(offerReducer(state, loadOneOffer(oneOfferFromServer)))
      .toEqual({...state, oneOffer: oneOffer});
  });

  it('should upload nearby offers from server', () => {
    expect(offerReducer(state, loadNearby(fakeOffersFromServer)))
      .toEqual({...state, nearbyOffers: fakeOffers});
  });

  it('should update nearby offers favorite status', () => {

    expect(offerReducer(stateWhithNearbyOffers, updateNearby(1, true)))
      .toEqual({...stateWhithNearbyOffers, nearbyOffers: fakeOffersWithFavoritesStatus});
  });
});
