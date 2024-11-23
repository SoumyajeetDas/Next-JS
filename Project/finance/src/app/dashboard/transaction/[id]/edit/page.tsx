import React from 'react';
import { createClient } from '@/lib/supbase/server';
import { notFound } from 'next/navigation';
import TransactionForm from '@/app/dashboard/components/transaction-form';

export const metadata = {
  title: 'Edit Transaction',
};
const Page: React.FC<{ params: { id: string } }> = async ({
  params: { id },
}) => {
  const supabase = createClient();
  const { data: transaction, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('id', id)
    .single();
  if (error) notFound();

  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Edit Transaction</h1>
      <TransactionForm initialData={transaction} />
    </>
  );
};

export default Page;
