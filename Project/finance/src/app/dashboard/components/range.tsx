/* eslint-disable @typescript-eslint/ban-ts-comment */

'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Select from '@/components/select';
import React from 'react';

export default function Range() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const range = searchParams.get('range') ?? 'last30days';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams();
    params.set('range', e.target.value);

    // Redirects it to dashboard/page.tsx?range=last30days
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    // @ts-ignore
    <Select defaultValue={range} onChange={handleChange}>
      <option value="today">Today</option>
      <option value="last7days">Last 7 days</option>
      <option value="last30days">Last 30 days</option>
      <option value="last12months">Last 12 months</option>
    </Select>
  );
}
