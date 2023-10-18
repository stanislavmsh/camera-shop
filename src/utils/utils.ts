import { ChangeEvent } from 'react';
import { TModalProcess } from '../types/state';

export function formatNumberWithSpace(number : number) {
  const numberStr = number.toString();

  const parts = numberStr.split('.');

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return parts.join('.');
}

type DebouncedFunction<F extends (evt: ChangeEvent<HTMLInputElement>) => void> = (
  ...args: Parameters<F>
) => void;

export function debounce<F extends (evt: ChangeEvent<HTMLInputElement>) => void>(
  func: F,
  delay: number
): DebouncedFunction<F> {
  let timeoutId: ReturnType<typeof setTimeout> | null;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    clearTimeout(timeoutId as ReturnType<typeof setTimeout>);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

export const resetModalStatus = (state: TModalProcess) => {
  state.purchaseModalStatus = false;
  state.formModalStatus = false;
  state.successModalStatus = false;
  state.basketModalStatus = false;
  state.removalModalStatus = false;
  state.orderSuccessModalStatus = false;
};
