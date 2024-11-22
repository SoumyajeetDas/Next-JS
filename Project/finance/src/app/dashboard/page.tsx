import React, { Suspense } from 'react';
import Trend from '@/app/dashboard/components/trend';
import TrendFallback from '@/app/dashboard/components/trend-fallback';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { sizes, variants } from '@/lib/variants';
import { types } from '@/lib/consts';
import { ErrorBoundary } from 'react-error-boundary';
import TransactionListFallback from '@/app/dashboard/components/transaction-list-fallback';
import Range from '@/app/dashboard/components/range';
import TransactionListWrapper from '@/app/dashboard/components/transaction-list-wrapper';

// This page will be dynamically rendered as it takes query parameters
const Page: React.FC<{ searchParams: { range: string } }> = ({
  searchParams,
}) => {
  const range = searchParams?.range ?? 'last30days';
  return (
    <>
      <section className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-semibold">Summary</h1>
        <aside>
          <Range />
        </aside>
      </section>

      <section className="mb-8">
        <h1 className="text-4xl font-semibold">Summary</h1>
      </section>
      <section className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {types.map((type) => (
          <ErrorBoundary
            key={type}
            fallback={
              <div className="text-red-500">Cannot fetch {type} trend data</div>
            }
          >
            {/*None of the Suspense will work if you have loading.tsx, as loading.tsx is wrapping the whole page.tsx*/}
            <Suspense fallback={<TrendFallback />}>
              <Trend type={type} range={range} />
            </Suspense>
          </ErrorBoundary>
        ))}
      </section>
      <section className="flex justify-between items-center mb-8">
        <h2 className="text-2xl">Transactions</h2>
        <Link
          href="/dashboard/transaction/add"
          className={`flex items-center space-x-1 ${variants['outline']} ${sizes['sm']}`}
        >
          <PlusCircle className="w-4 h-4" />
          <div>Add</div>
        </Link>
      </section>
      <Suspense fallback={<TransactionListFallback />}>
        <TransactionListWrapper range={range} />
      </Suspense>
    </>
  );
};

export default Page;
