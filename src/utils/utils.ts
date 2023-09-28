export function formatNumberWithSpace(number : number) {
  const numberStr = number.toString();

  const parts = numberStr.split('.');

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return parts.join('.');
}
