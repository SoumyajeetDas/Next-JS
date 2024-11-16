import React from 'react';
import BaseTrend from '@/components/trend';

const Trend = async ({ type }: { type: string }) => {
  try {
    const response = await fetch(`${process.env.API_URL}/trends/${type}`);
    const { amount, prevAmount } = await response.json();
    return <BaseTrend type={type} amount={amount} prevAmount={prevAmount} />;
  } catch (err) {
    return <BaseTrend type={type} amount={0} prevAmount={0} />;
  }
};

export default Trend;
