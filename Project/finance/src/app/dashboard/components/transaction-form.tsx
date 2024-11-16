'use client';

import React, { useState } from 'react';
import Label from '@/components/label';
import Select from '@/components/select';
import { categories, types } from '@/lib/consts';
import Input from '@/components/input';
import Button from '@/components/button';
import { useForm } from 'react-hook-form';
import transactionSchema from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { purgeTransactionListCache } from '@/lib/action';
import { useRouter } from 'next/navigation';

const TransactionForm = () => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<z.infer<typeof transactionSchema>>({
    mode: 'onTouched',
    resolver: zodResolver(transactionSchema),
  });

  const router = useRouter();

  const [isSaving, setSaving] = useState(false);
  const onSubmit = async (data: z.infer<typeof transactionSchema>) => {
    setSaving(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          created_at: `${data.created_at}T00:00:00`,
        }),
      });

      await purgeTransactionListCache();

      router.push('/dashboard');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="mb-1">Type</Label>
          <Select {...register('type')}>
            {types.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </Select>
        </div>

        <div>
          <Label className="mb-1">Category</Label>
          <Select {...register('category')}>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </Select>
        </div>

        <div>
          <Label className="mb-1">Date</Label>
          <Input
            {...register('created_at', {
              required: 'The date is required',
            })}
          />
          {errors.created_at && (
            <p className="mt-1 text-red-500">{errors.created_at.message}</p>
          )}
        </div>

        <div>
          <Label className="mb-1">Amount</Label>
          <Input
            type="number"
            {...register('amount', {
              required: 'The amount is required',
              valueAsNumber: true,
              min: { value: 0, message: 'The amount must be greater than 0' },
            })}
          />
          {errors.amount && (
            <p className="mt-1 text-red-500">{errors.amount.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <Label className="mb-1">Description</Label>
          <Input
            {...register('description', {
              required: 'The description is required',
            })}
          />
          {errors.description && (
            <p className="mt-1 text-red-500">{errors.description.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="outline" disabled={isSaving}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default TransactionForm;
