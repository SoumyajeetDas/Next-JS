import React from 'react';
import BaseTrend from '@/components/trend';
import { createClient } from '@/lib/supbase/server';

// As the parent component is dynamically rendered, this component will also be dynamically rendered
const Trend = async ({ type, range }: { type: string; range: string }) => {
  /* One way to handle error */
  // try {
  //   const { amount, prevAmount } = await response.json();
  //   return <BaseTrend type={type} amount={amount} prevAmount={prevAmount} />;
  // } catch (err) {
  //   return <BaseTrend type={type} amount={0} prevAmount={0} />;
  // }

  /* Another way will be using React Error Boundary. Check the dashboard/page.tsx code */
  const supabase = createClient();

  // RPC (Remote Procedure Calls) used to call DB functions in supbase
  const { data, error } = await supabase.rpc('calculate_total', {
    range_arg: range,
    type_arg: type,
  });

  if (error) {
    throw error;
  }

  const amounts = data[0];

  return (
    <BaseTrend
      type={type}
      amount={amounts.current_amount}
      prevAmount={amounts.previous_amount - 500}
    />
  );
};

export default Trend;
