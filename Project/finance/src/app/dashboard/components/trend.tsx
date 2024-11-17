import React from 'react';
import BaseTrend from '@/components/trend';

const Trend = async ({ type }: { type: string }) => {
  /* One way to handle error */
  // try {
  //   const { amount, prevAmount } = await response.json();
  //   return <BaseTrend type={type} amount={amount} prevAmount={prevAmount} />;
  // } catch (err) {
  //   return <BaseTrend type={type} amount={0} prevAmount={0} />;
  // }

  /* Another way will be using React Error Boundary. Check the dashboard/page.tsx code */
  const response = await fetch(`${process.env.API_URL}/trends/${type}`);
  const { amount, prevAmount } = await response.json();

  return <BaseTrend type={type} amount={amount} prevAmount={prevAmount} />;
};

export default Trend;
