import React from 'react';
import { QuoteWithCustomer } from '../../hooks/useQuotes';
import DataTable, { Column } from '../shared/DataTable';

interface QuoteListProps {
  quotes: QuoteWithCustomer[];
  onEdit: (quote: QuoteWithCustomer) => void;
  onDelete: (id: string) => Promise<void>;
  onView: (quote: QuoteWithCustomer) => void;
}

const QuoteList: React.FC<QuoteListProps> = ({ quotes, onEdit, onDelete, onView }) => {
  const columns: Column<QuoteWithCustomer>[] = [
    { label: 'Customer', render: (quote) => `${quote.customer.firstName} ${quote.customer.lastName}` },
    { label: 'Address', render: (quote) => quote.customer.address },
    { label: 'Monthly Rate', render: (quote) => `$${quote.monthlyRate.toFixed(2)}` },
    { label: 'Installation Fee', render: (quote) => `$${quote.installationFee.toFixed(2)}` },
    { label: 'Delivery Fee', render: (quote) => `$${quote.deliveryFee.toFixed(2)}` },
    { label: 'Total Length', render: (quote) => `${quote.totalLength} ft` },
    { label: 'Status', render: (quote) => quote.status },
  ];

  return (
    <DataTable 
      items={quotes} 
      columns={columns} 
      onEdit={onEdit}
      onDelete={onDelete}
      onView={onView}
    />
  );
};

export default QuoteList;