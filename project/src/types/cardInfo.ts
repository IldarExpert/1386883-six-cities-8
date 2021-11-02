export type Location = {
  latitude: number,
  longitude: number,
  zoom: number,
}

export type City = {
  location: Location,
  name: string,
}

export type Host = {
  avatarUrl: string,
  id: number,
  isPro: boolean,
  name: string,
}

export type HostFromServer = {
  'avatar_url': string,
  id: number,
  'is_pro': boolean,
  name: string,
}

export type CardOne = {
  bedrooms: number,
  city: City,
  description: string,
  goods: string[],
  host: Host,
  id: number,
  images: string[],
  isFavorite: boolean,
  isPremium: boolean,
  location: Location,
  maxAdults: number,
  previewImage: string,
  price: number,
  rating: number,
  title: string,
  type: string,
};

export type CardOneFromServer = {
  bedrooms: number,
  city: City,
  description: string,
  goods: string[],
  host: HostFromServer,
  id: number,
  images: string[],
  'is_favorite': boolean,
  'is_premium': boolean,
  location: Location,
  'max_adults': number,
  'preview_image': string,
  price: number,
  rating: number,
  title: string,
  type: string,
};

export type CardList = CardOne[];
