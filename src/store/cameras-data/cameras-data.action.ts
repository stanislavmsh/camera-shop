
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TCamera } from '../../types/camera';
import { AppDispatch, State } from '../../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../utils/const';


export const fetchCamerasAction = createAsyncThunk<TCamera[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameras',
  async (_arg, { extra: api }) : Promise<TCamera[]> => {
    const {data} = await api.get<TCamera[]>(APIRoute.Cameras);
    return data;
  }

);

