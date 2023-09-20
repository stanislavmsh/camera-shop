import { createAsyncThunk } from '@reduxjs/toolkit';
import { TPromo } from '../../types/promo';
import { AppDispatch } from '../../types/state';
import { State } from '../../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../utils/const';


export const fetchPromoAction = createAsyncThunk<TPromo[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromo',
  async (_arg, { extra: api }): Promise<TPromo[]> => {
    const {data} = await api.get<TPromo[]>(APIRoute.Promo);
    return data;
  }

);
