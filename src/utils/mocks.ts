import { Action } from 'redux';
import { TCamera, TCategory, TLevel, TType } from '../types/camera';
import { name, datatype, lorem , image, commerce} from 'faker';

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

const TTypeValues: TType[] = ['Коллекционная', 'Моментальная', 'Цифровая', 'Плёночная'];
const TLevelValues: TLevel[] = ['Нулевой', 'Любительский', 'Профессиональный'];
const TCategoryValues: TCategory[] = ['Видеокамера', 'Фотоаппарат'];

function getRandomElement<T>(arr : T[]) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}


export const makeFakeCamerasData = () : TCamera[] => (
  new Array(7).fill(null).map(() => ({
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
  }))
);
