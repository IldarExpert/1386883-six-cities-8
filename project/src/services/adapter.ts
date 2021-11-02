import type {CardOneFromServer} from '../types/cardInfo';

export const convertOneCity = (oneCity: CardOneFromServer) => ({
  bedrooms: oneCity.bedrooms,
  city: {
    location: {
      latitude: oneCity.city.location.latitude,
      longitude: oneCity.city.location.longitude,
      zoom: oneCity.city.location.zoom,
    },
    name: oneCity.city.name,
  },
  description: oneCity.description,
  goods: oneCity.goods,
  host: {
    avatarUrl: oneCity.host.avatar_url,
    id: oneCity.host.id,
    isPro: oneCity.host.is_pro,
    name: oneCity.host.name,
  },
  id: oneCity.id,
  images: oneCity.images,
  isFavorite: oneCity.is_favorite,
  isPremium: oneCity.is_premium,
  location: {
    latitude: oneCity.location.latitude,
    longitude: oneCity.location.longitude,
    zoom: oneCity.location.zoom,
  },
  maxAdults: oneCity.max_adults,
  previewImage: oneCity.preview_image,
  price: oneCity.price,
  rating: oneCity.rating,
  title: oneCity.title,
  type: oneCity.type,
});

export const convertCityList = (cityList: CardOneFromServer[]) => cityList.map(convertOneCity);