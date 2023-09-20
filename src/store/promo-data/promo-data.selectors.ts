import { TPromo } from '../../types/promo';
import { State } from '../../types/state';
import { NameSpace } from '../../utils/const';


export const getPromos = (state: State): TPromo[] => state[NameSpace.Promo].promos;
export const getPromoErrorStatus = (state: State): boolean => state[NameSpace.Promo].hasError;
