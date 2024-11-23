import React from 'react';
import useFormatCurrency from '@/hooks/useFormatCurrency';

const TransactionSummaryItem: React.FC<{ date: string; amount: number }> = ({
  date,
  amount,
}) => {
  const formattedAmount = useFormatCurrency(amount);

  return (
    <div className="flex text-gray-500 dark:text-gray-400 font-semibold">
      <div className="grow">{date}</div>

      <div className="min-w-[70px] text-right font-semibold">
        {formattedAmount}
      </div>
      <div className="min-w-[100px]"></div>
    </div>
  );
};

export default TransactionSummaryItem;
