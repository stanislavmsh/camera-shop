export const enum AppRoute {
  Root = '/',
  Login = '/login',
  Basket = '/basket',
  Item = '/item',
}

export const enum APIRoute {
  Promo = '/promo',
  Cameras = '/cameras',
  Similar = '/similar',
  Reviews = '/reviews'
}

export const enum NameSpace {
  Cameras = 'CAMERAS',
  Promo = 'PROMO',
  Current = 'CURRENT',
  Modal = 'MODAL',
}

export const enum RatingName {
  Awful = 'Ужасно',
  Bad = 'Плохо',
  Average = 'Нормально',
  Good = 'Хорошо',
  Perfect = 'Отлично',
}

export const enum SortingOption {
  HighToLow = 'HighToLow',
  LowToHigh = 'LowToHigh'
}

export const enum SortingValues {
  Price = 'price',
  Rating = 'rating',
}

export const STARS_RATING = [1 , 2 , 3 , 4 , 5];

export const FOCUS_TIMEOUT = 500;

export const BACKEND_URL = 'https://camera-shop.accelerator.pages.academy/';
