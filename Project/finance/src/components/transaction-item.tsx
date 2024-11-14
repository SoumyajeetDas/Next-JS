/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { HandCoins, Landmark, PiggyBank, Wallet } from 'lucide-react';
import useFormatCurrency from '@/hooks/useFormatCurrency';
import { TransactionItemProps, TypesMaptype } from '@/@models/types';

const TransactionItem: React.FC<TransactionItemProps> = ({
  type,
  category,
  description,
  amount,
}) => {
  const typesMap: TypesMaptype = {
    Income: {
      icon: HandCoins,
      colors: 'text-green-500 dark:text-green-400',
    },
    Expense: {
      icon: Wallet,
      colors: 'text-red-500 dark:text-red-400',
    },
    Saving: {
      icon: PiggyBank,
      colors: 'text-indigo-500 dark:text-indigo-400',
    },
    Investment: {
      icon: Landmark,
      colors: 'text-yellow-500 dark:text-yellow-400',
    },
  };
  const IconComponent = typesMap[type].icon;
  const colors = typesMap[type].colors;

  const formattedAmount = useFormatCurrency(amount);

  return (
    <div className="w-full flex items-center">
      <div className="flex items-center mr-4 grow">
        <IconComponent className={`${colors} mr-2 w-4 h-4 hidden sm:block`} />
        <span>{description}</span>
      </div>

      <div className="min-w-[150px] items-center hidden md:flex">
        {category && (
          <div className="rounded-md text-xs bg-gray-700 dark:bg-gray-100 text-gray-100 dark:text-black px-2 py-0.5">
            {category}
          </div>
        )}
      </div>

      <div className="min-w-[70px] text-right">{formattedAmount}</div>

      <div className="min-w-[50px] flex justify-end">···</div>
    </div>
  );
};

export default TransactionItem;
