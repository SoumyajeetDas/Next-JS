import React, { Suspense } from 'react';
import TransactionList from '@/app/dashboard/components/transaction-list';
import Trend from '@/app/dashboard/components/trend';
import TrendFallback from '@/app/dashboard/components/trend-fallback';

const Page: React.FC = () => {
  return (
    <>
      <section className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {/*These suspense will not work as it is overriddeen by the loading.tsx*/}
        <Suspense fallback={<TrendFallback />}>
          <Trend type="Income" />
        </Suspense>

        <Suspense fallback={<TrendFallback />}>
          <Trend type="Expense" />
        </Suspense>

        <Suspense fallback={<TrendFallback />}>
          <Trend type="Saving" />
        </Suspense>

        <Suspense fallback={<TrendFallback />}>
          <Trend type="Investment" />
        </Suspense>
      </section>
      <TransactionList />;
    </>
  );
};

export default Page;
