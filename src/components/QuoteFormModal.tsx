import React from 'react';
import { Customer, Quote } from '../types/common';
import QuoteForm from './QuoteForm';
import { Timestamp } from 'firebase/firestore';

interface QuoteFormModalProps {
  customer: Customer;
  onClose: () => void;
  onQuoteCreated: () => void;
}

const QuoteFormModal: React.FC<QuoteFormModalProps> = ({
  customer,
  onClose,
  onQuoteCreated,
}) => {
  const quote: Quote = {
    customerId: customer.id,
    rentalRequestId: 'DIRECT_FROM_CUSTOMER',
    // Remove customerName and customerAddress if they're not in the Quote type
    components: {},
    monthlyRate: 0,
    installationFee: 0,
    deliveryFee: 0,
    totalLength: 0,
    status: 'pending',
    id: '',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };

  return (
    <QuoteForm
      quote={quote}
      customer={customer}  // Pass the customer object separately
      onClose={onClose}
      onQuoteCreated={onQuoteCreated}
    />
  );
};

export default QuoteFormModal;