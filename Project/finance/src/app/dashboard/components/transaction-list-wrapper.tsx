import { TransactionListTypes } from '@/@models/types';
import { fetchTransactions } from '@/lib/action';
import TransactionList from '@/app/dashboard/components/transaction-list';

// fetchTransactions call is easy in RSC, If used a client component here then needed to write a lot of code like useEffct() and what not. And this will anyway be used
// only onece during page loading
export default async function TransactionListWrapper({
  range,
}: {
  range: string;
}) {
  const transactions = (await fetchTransactions(
    range,
  )) as TransactionListTypes[];
  return (
    <TransactionList
      initialTransactions={transactions}
      range={range}
      // key is used to re-render the component when the range changes othewise not working
      key={range}
    />
  );
}
