import React, { useState } from 'react';
import { useQuotes, QuoteWithCustomer } from '../hooks/useQuotes';
import QuoteList from './quotes/QuoteList';
import QuoteFormModal from './quotes/QuoteFormModal';
import CustomerSelectionModal from './CustomerSelectionModal';
import ViewDetailsModal from './shared/ViewDetailsModal';
import { Customer } from '../types/common';

const Quotes: React.FC = () => {
  const { quotes, handleAddOrUpdateQuote, handleDelete } = useQuotes();
  const [selectedQuote, setSelectedQuote] = useState<QuoteWithCustomer | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showCustomerSelection, setShowCustomerSelection] = useState(false);
  const [showViewDetails, setShowViewDetails] = useState(false);

  const handleEdit = (quote: QuoteWithCustomer) => {
    setSelectedQuote(quote);
    setShowEditForm(true);
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setSelectedQuote(null);
  };

  const handleAddNewQuote = () => {
    setShowCustomerSelection(true);
  };

  const handleSelectCustomer = (customer: Customer) => {
    setShowCustomerSelection(false);
    setSelectedQuote({ customer } as QuoteWithCustomer);
    setShowEditForm(true);
  };

  const handleView = (quote: QuoteWithCustomer) => {
    setSelectedQuote(quote);
    setShowViewDetails(true);
  };

  return (
    <div>
      <h2>Quotes</h2>
      <button onClick={handleAddNewQuote}>Add New Quote</button>
      <QuoteList 
        quotes={quotes}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />
      {showEditForm && selectedQuote && (
        <QuoteFormModal
          quote={selectedQuote}
          customer={selectedQuote.customer}
          onClose={handleCloseEditForm}
          onQuoteCreated={handleAddOrUpdateQuote}
        />
      )}
      {showCustomerSelection && (
        <CustomerSelectionModal
          onSelectCustomer={handleSelectCustomer}
          onClose={() => setShowCustomerSelection(false)}
        />
      )}
      {showViewDetails && selectedQuote && (
        <ViewDetailsModal
          entity={selectedQuote}
          onClose={() => setShowViewDetails(false)}
        />
      )}
    </div>
  );
};

export default Quotes;