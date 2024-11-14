/* eslint-disable @typescript-eslint/no-explicit-any */

export interface TransactionItemProps {
  type: string;
  category?: string;
  description: string;
  amount: number;
}

export interface TypesMaptype {
  [key: string]: {
    icon: any;
    colors: string;
  };
}

export type TransactionListTypes = TransactionItemProps & {
  id: string;
  created_at: string;
};
