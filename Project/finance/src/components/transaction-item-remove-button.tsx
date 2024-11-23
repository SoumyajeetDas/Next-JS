import React, { useState } from 'react';
import { deleteTransaction } from '@/lib/action';
import Button from '@/components/button';
import { Loader, X } from 'lucide-react';

const TransactionItemRemoveButton: React.FC<{
  id: string;
  onRemove: (id: string) => void;
}> = ({ id, onRemove }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const handleClick = async () => {
    if (Number(id) < 5) {
      return;
    }

    if (!confirmed) {
      setConfirmed(true);
      // return;
    }
    try {
      setLoading(true);
      await deleteTransaction(id);
      // notify the parent

      console.log('Removing id', id);
      onRemove(id);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      size="xs"
      variant={!confirmed ? 'ghost' : 'danger'}
      onClick={handleClick}
      aria-disabled={loading}
    >
      {!loading && <X className="w-4 h-4" />}
      {loading && <Loader className="w-4 h-4 animate-spin" />}
    </Button>
  );
};

export default TransactionItemRemoveButton;
