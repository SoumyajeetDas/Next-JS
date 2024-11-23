/* eslint-disable @typescript-eslint/no-explicit-any */

export interface TransactionItemProps {
  id: string;
  type: string;
  category?: string;
  description: string;
  amount: number;
  onRemove: (id: string) => void;
}

export interface TypesMaptype {
  [key: string]: {
    icon: any;
    colors: string;
  };
}

export type TransactionListTypes = TransactionItemProps & {
  created_at: string;
};
