// src/components/Quotes.tsx
import React, { useState, useEffect } from 'react';
import { Quote, Customer } from '../types/common';
import { CrudService } from '../services/crudService';
import DataTable, { Column } from './shared/DataTable';
import QuoteForm from './QuoteForm';

interface QuoteWithCustomer extends Quote {
  customer: Customer;
}

const quoteService = new CrudService<Quote>('quotes');
const customerService = new CrudService<Customer>('customers');

const Quotes: React.FC = () => {
  const [quotes, setQuotes] = useState<QuoteWithCustomer[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<QuoteWithCustomer | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    const fetchedQuotes = await quoteService.getAll();
    const quotesWithCustomers = await Promise.all(
      fetchedQuotes.map(async (quote) => {
        const customer = await customerService.getById(quote.customerId);
        return { ...quote, customer } as QuoteWithCustomer;
      })
    );
    setQuotes(quotesWithCustomers);
  };

  const handleEdit = (quote: QuoteWithCustomer) => {
    setSelectedQuote(quote);
    setShowEditForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await quoteService.delete(id);
      fetchQuotes();
    } catch (error) {
      console.error('Error deleting quote: ', error);
    }
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setSelectedQuote(null);
  };

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
    <div>
      <h2>Quotes</h2>
      <DataTable 
        items={quotes} 
        columns={columns} 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {showEditForm && selectedQuote && (
        <QuoteForm 
          quote={selectedQuote}
          customer={selectedQuote.customer}
          onClose={handleCloseEditForm}
          onQuoteCreated={fetchQuotes}
        />
      )}
    </div>
  );
};

export default Quotes;