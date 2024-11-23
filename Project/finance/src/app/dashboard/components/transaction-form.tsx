/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

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
import { undefined, z } from 'zod';
import { createTransaction, updateTransaction } from '@/lib/action';
import { useRouter } from 'next/navigation';
import FormError from '@/components/form-error';
import DevT from '@/components/formDevtool';
import { TransactionListTypes } from '@/@models/types';

const TransactionForm: React.FC<{
  initialData: TransactionListTypes;
}> = ({ initialData }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof transactionSchema>>({
    mode: 'onTouched',
    resolver: zodResolver(transactionSchema),
    defaultValues: initialData ?? {
      created_at: new Date().toISOString().split('T')[0],
    },
  });
  const router = useRouter();
  const [isSaving, setSaving] = useState(false);
  const [lastError, setLastError] = useState<null | undefined | Error>();
  const type = watch('type');

  const editing = Boolean(initialData);

  const onSubmit = async (data: z.infer<typeof transactionSchema>) => {
    setSaving(true);

    setLastError(undefined);

    try {
      if (editing) {
        // Edit action
        await updateTransaction(initialData.id, data as unknown as FormData);
      } else {
        await createTransaction(data);
      }
      router.push('/dashboard');
    } catch (error) {
      setLastError(error as Error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="mb-1">Type</Label>
            <Select
              {...register('type', {
                onChange: (e) => {
                  if (e.target.value !== 'Expense') {
                    setValue('category', undefined);
                  }
                },
              })}
            >
              {types.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </Select>
            <FormError error={errors.type as unknown as Error} />
          </div>

          <div>
            <Label className="mb-1">Category</Label>
            {/*@ts-ignore*/}
            <Select {...register('category')} disabled={type !== 'Expense'}>
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </Select>
            <FormError error={errors.category as unknown as Error} />
          </div>

          <div>
            <Label className="mb-1">Date</Label>
            <Input {...register('created_at')} disabled={editing} />
            <FormError error={errors.created_at as unknown as Error} />
          </div>

          <div>
            <Label className="mb-1">Amount</Label>
            <Input type="number" {...register('amount')} />
            <FormError error={errors.amount as unknown as Error} />
          </div>

          <div className="col-span-1 md:col-span-2">
            <Label className="mb-1">Description</Label>
            <Input {...register('description')} />
            <FormError error={errors.description as unknown as Error} />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>{lastError && <FormError error={lastError} />}</div>
          <Button type="submit" disabled={isSaving}>
            Save
          </Button>
        </div>
      </form>
      <DevT control={control} />
    </>
  );
};

export default TransactionForm;
