import { useMemo } from 'react';

const useFormatCurrency = (value: number) => {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);

  return useMemo(() => formatCurrency(value), [value]);
};

export default useFormatCurrency;
