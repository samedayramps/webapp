// src/components/Quotes.tsx
import React, { useState, useEffect } from 'react';
import { Quote } from '../types/common';
import { CrudService } from '../services/crudService';
import DataTable, { Column } from './shared/DataTable';

const quoteService = new CrudService<Quote>('quotes');

const Quotes: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    const fetchedQuotes = await quoteService.getAll();
    setQuotes(fetchedQuotes);
  };

  const handleEdit = (quote: Quote) => {
    // Implement edit functionality if needed
    console.log('Edit quote:', quote);
  };

  const handleDelete = async (id: string) => {
    try {
      await quoteService.delete(id);
      fetchQuotes();
    } catch (error) {
      console.error('Error deleting quote: ', error);
    }
  };

  const columns: Column<Quote>[] = [
    { label: 'Customer ID', render: (quote) => quote.customerId },
    { label: 'Request ID', render: (quote) => quote.rentalRequestId },
    { label: 'Monthly Rate', render: (quote) => `$${quote.monthlyRate}` },
    { label: 'Total Length', render: (quote) => `${quote.totalLength} ft` },
    { label: 'Status', render: (quote) => quote.status },
  ];

  return (
    <div>
      <h2>Quotes</h2>
      <DataTable 
        items={quotes} 
        columns={columns} 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Quotes;