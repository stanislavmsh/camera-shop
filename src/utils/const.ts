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
  Reviews = '/reviews',
  Coupons = '/coupons',
  Orders = '/orders'
}

export const enum NameSpace {
  Cameras = 'CAMERAS',
  Promo = 'PROMO',
  Current = 'CURRENT',
  Modal = 'MODAL',
  Basket = 'BASKET'
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

export enum FilterCategory {
  Photo = 'Фотокамера',
  Video = 'Видеокамера',
}

export enum FilterType {
  Digital = 'Цифровая',
  Collection = 'Коллекционная',
  Momental = 'Моментальная',
  Film = 'Плёночная',
}

export enum FilterLevel {
  Zero = 'Нулевой',
  Newbie = 'Любительский',
  Pro = 'Профессиональный'
}

export const enum SearchParam {
  Page = 'page',
  Type = 'type',
  Category = 'category',
  Level = 'level',
  Sorting = 'sort',
  Order = 'order',
}


export const enum StorageName {
  Camera = 'basketCameras',
  CouponName = 'basketCoupon',
  CouponValue = 'basketCouponValue'
}

export const STARS_RATING = [1 , 2 , 3 , 4 , 5];

export const FOCUS_TIMEOUT = 500;

export const BACKEND_URL = 'https://camera-shop.accelerator.pages.academy';
