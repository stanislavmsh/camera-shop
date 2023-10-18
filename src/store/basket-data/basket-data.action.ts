import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../../utils/const';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../types/state';
import { TOrder } from '../../types/order';
import { resetBasket } from './basket-data.slice';
import { setActiveStatus, setOrderSuccessModalStatus } from '../modal-process/modal-process.slice';


export const fetchCouponAction = createAsyncThunk<{data: number ; value: string}, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>('basket/fetchCouponAction',
  async (value, {extra: api}) => {
    const { data } = await api.post<number>(APIRoute.Coupons,
      {
        'coupon': value,
      }
    );

    return {data, value};

  });


export const sendOrderAction = createAsyncThunk<void, TOrder, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>('basket/sendOrderAction',
  async (order, {dispatch, extra: api}) => {
    await api.post<TOrder>(APIRoute.Orders, order);
    dispatch(resetBasket());
    dispatch(setActiveStatus(true));
    dispatch(setOrderSuccessModalStatus(true));
    document.body.style.overflow = 'hidden';
  }
);
