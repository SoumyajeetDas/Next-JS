import React from 'react';
import TransactionForm from '@/app/dashboard/components/transaction-form';

export const metadata = {
  title: 'Add Transaction',
};

const Page = () => {
  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Add Transaction</h1>
      <TransactionForm />
    </>
  );
};

export default Page;
