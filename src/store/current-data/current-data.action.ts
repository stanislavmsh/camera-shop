import { createAsyncThunk } from '@reduxjs/toolkit';
import { TCamera } from '../../types/camera';
import { AppDispatch, State } from '../../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../utils/const';
import { TReview } from '../../types/review';


export const fetchCurrentAction = createAsyncThunk<TCamera, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCurrent',
  async (id, { extra: api }): Promise<TCamera> => {
    const {data} = await api.get<TCamera>(`${APIRoute.Cameras}/${id}`);
    return data;
  }
);


export const fetchSimilarAction = createAsyncThunk<TCamera[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilar',
  async (id, { extra: api }): Promise<TCamera[]> => {
    const {data} = await api.get<TCamera[]>(`${APIRoute.Cameras}/${id}${APIRoute.Similar}`);
    return data;
  }
);

export const fetchReviewsAction = createAsyncThunk<TReview[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (id, { extra: api }): Promise<TReview[]> => {
    const {data} = await api.get<TReview[]>(`${APIRoute.Cameras}/${id}${APIRoute.Reviews}`);
    const sortedByDate = data.sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());
    return sortedByDate;
  }
);

