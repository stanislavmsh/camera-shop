import { Action } from 'redux';
import { TCamera, TCategory, TLevel, TType } from '../types/camera';
import { name, datatype, lorem , image, commerce } from 'faker';
import { createAPI } from '../services/api';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { TReview } from '../types/review';
import { TPromo } from '../types/promo';

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>

const TTypeValues: TType[] = ['Коллекционная', 'Моментальная', 'Цифровая', 'Плёночная'];
const TLevelValues: TLevel[] = ['Нулевой', 'Любительский', 'Профессиональный'];
const TCategoryValues: TCategory[] = ['Видеокамера', 'Фотоаппарат'];

function getRandomElement<T>(arr : T[]) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export const makeFakeCurrentCameraData = () : TCamera => ({
  id: datatype.number(),
  name: name.firstName(),
  vendorCode: datatype.uuid(),
  type: getRandomElement(TTypeValues),
  category: getRandomElement(TCategoryValues),
  description: lorem.sentence(),
  level: getRandomElement(TLevelValues),
  price: parseFloat(commerce.price()),
  rating: datatype.number({ min: 1, max: 5 }),
  reviewCount: datatype.number(),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
});


export const makeFakeCamerasData = () : TCamera[] => (
  new Array(7).fill(null).map(() => (
    makeFakeCurrentCameraData()
  ))
);


export const makeFakeComments = () : TReview[] => (
  new Array(8).fill(null).map(() => (
    {
      id: datatype.uuid(),
      createAt: datatype.datetime.toString(),
      cameraId: datatype.number(),
      userName: name.firstName(),
      advantage: lorem.sentence(),
      disadvantage: lorem.sentence(),
      review: lorem.sentences(),
      rating: datatype.number({ min: 1, max: 5 }),
    }

  )

  )
);

export const makeFakePromos = () : TPromo[] => (
  new Array(3).fill(null).map(() => (
    {
      id: datatype.number(),
      name: name.firstName(),
      previewImg: image.imageUrl(),
      previewImg2x: image.imageUrl(),
      previewImgWebp: image.imageUrl(),
      previewImgWebp2x: image.imageUrl(),
    }
  ))
);
