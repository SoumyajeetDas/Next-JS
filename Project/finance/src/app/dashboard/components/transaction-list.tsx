/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

'use client';

import React, { useState } from 'react';
import TransactionItem from '@/components/transaction-item';
import { TransactionListTypes } from '@/@models/types';
import TransactionSummaryItem from '@/components/transaction-summary-item';
import groupAndSumTransactionsByDate from '@/lib/utils';
import { fetchTransactions } from '@/lib/action';
import Button from '@/components/button';
import { Loader } from 'lucide-react';

const TransactionList = ({
  initialTransactions,
  range,
}: {
  initialTransactions: TransactionListTypes[];
  range: string;
}) => {
  // const response = await fetch(`${process.env.API_URL}/transactions`, {
  //   next: {
  //     tags: ['transaction-list'],
  //   },
  // });
  // const transactions = (await response.json()) as TransactionListTypes[];

  const [transactions, setTransactions] = useState(initialTransactions);
  const [loading, setLoading] = useState(false);

  const [buttonHidden, setButtonHidden] = useState(
    initialTransactions.length === 0,
  );

  const grouped = groupAndSumTransactionsByDate(initialTransactions);

  const handleClick = async () => {
    setLoading(true);
    let nextTransactions: string | any[] = [];
    try {
      nextTransactions = await fetchTransactions(
        range,
        transactions.length,
        10,
      );
      setButtonHidden(nextTransactions.length === 0);

      setTransactions((prevTransactions) => [
        ...prevTransactions,
        // @ts-ignore
        ...nextTransactions,
      ]);
    } finally {
      setLoading(false);
    }
  };

  //Created a HOF here as the function will be called from the child component during onClick, but the function parameter will be coming from parent component
  const handleRemoved = (id: string) => () => {
    console.log('Calling handleRemoved with id', id);
    setTransactions((prev) => [...prev].filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([date, { transactions, amount }]) => (
        <div key={date}>
          <TransactionSummaryItem date={date} amount={amount} />
          <hr className="my-4 border-gray-200 dark:border-gray-800" />
          <section className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id}>
                <TransactionItem
                  {...transaction}
                  onRemove={handleRemoved(transaction.id)}
                />
              </div>
            ))}
          </section>
        </div>
      ))}

      {transactions.length === 0 && (
        <div className="text-center text-gray-400 dark:text-gray-500">
          No transactions found
        </div>
      )}
      {!buttonHidden && transactions.length > 10 && (
        <div className="flex justify-center">
          <Button variant="ghost" onClick={handleClick} disabled={loading}>
            <div className="flex items-center space-x-1">
              {loading && <Loader className="animate-spin" />}
              <div>Load More</div>
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
