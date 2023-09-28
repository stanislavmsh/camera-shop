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
}

export const enum RatingName {
  Awful = 'Ужасно',
  Bad = 'Плохо',
  Average = 'Нормально',
  Good = 'Хорошо',
  Perfect = 'Отлично',
}

export const STARS_RATING = [1 , 2 , 3 , 4 , 5];

export const FOCUS_TIMEOUT = 300;

export const BACKEND_URL = 'https://camera-shop.accelerator.pages.academy/';
