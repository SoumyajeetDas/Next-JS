'use client';

import React, { useMemo } from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import useFormatCurrency from '@/hooks/useFormatCurrency';

const Trend = ({
  type,
  amount,
  prevAmount,
}: {
  type: string;
  amount: number;
  prevAmount: number;
}) => {
  const formattedCurrency = useFormatCurrency(amount);

  const colorClasses: { [key: string]: string } = {
    Income: 'text-green-700 dark:text-green-300',
    Expense: 'text-red-700 dark:text-red-300',
    Investment: 'text-indigo-700 dark:text-indigo-300',
    Saving: 'text-yellow-700 dark:text-yellow-300',
  };

  // use Memo 1st Technique
  // const calcPercentageChange = (amountData: number, prevAmountData: number) => {
  //   if (prevAmountData === 0) return 0;
  //
  //   return ((amountData - prevAmountData) / prevAmountData) * 100;
  // };
  //
  // const percentageChange = useMemo(() => calcPercentageChange(amount, prevAmount), [amount, prevAmount]);

  // use Memo 2nd Technique
  const percentageChange = useMemo(() => {
    if (!prevAmount || !amount) return 0;

    return ((amount - prevAmount) / prevAmount) * 100;
  }, [amount, prevAmount]);

  return (
    <div>
      <div className={`font-semibold ${colorClasses[type]}`}>{type}</div>
      <div className="text-2xl font-semibold text-black dark:text-white mb-2">
        {formattedCurrency}
      </div>

      <div className="flex space-x-1 items-center text-sm">
        {percentageChange <= 0 && (
          <ArrowDownLeft className="text-red-700 dark:text-red-300" />
        )}
        {percentageChange > 0 && (
          <ArrowUpRight className="text-green-700 dark:text-green-300" />
        )}
        <div>{percentageChange.toFixed(2)}% vs last period</div>
      </div>
    </div>
  );
};

export default Trend;
