import { TransactionListTypes } from '@/@models/types';

const groupAndSumTransactionsByDate = (
  transactions: TransactionListTypes[],
) => {
  const grouped: {
    [key: string]: { transactions: TransactionListTypes[]; amount: number };
  } = {};
  for (const transaction of transactions) {
    const date = transaction.created_at.split('T')[0];
    if (!grouped[date]) {
      grouped[date] = { transactions: [], amount: 0 };
    }
    grouped[date].transactions.push(transaction);
    const amount =
      transaction.type === 'Expense' ? -transaction.amount : transaction.amount;
    grouped[date].amount += amount;
  }
  return grouped;
};

export default groupAndSumTransactionsByDate;
