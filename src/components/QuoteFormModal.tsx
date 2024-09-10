import React, { useState, useCallback } from 'react';
import { Customer, Quote } from '../types/common';
import QuoteForm from './QuoteForm';
import RampPricingCalculator from './RampPricingCalculator';
import { Timestamp } from 'firebase/firestore';

interface QuoteFormModalProps {
  quote?: Partial<Quote>;
  customer: Customer;
  onClose: () => void;
  onQuoteCreated: (quote: Partial<Quote>) => Promise<void>;
}

const QuoteFormModal: React.FC<QuoteFormModalProps> = ({
  quote,
  customer,
  onClose,
  onQuoteCreated,
}) => {
  const [rampConfig, setRampConfig] = useState({
    monthlyRate: quote?.monthlyRate || 0,
    components: quote?.components || {},
    installationFee: quote?.installationFee || 0,
    deliveryFee: quote?.deliveryFee || 0,
    totalLength: quote?.totalLength || 0,
  });

  const handlePriceCalculated = useCallback((
    monthlyRate: number,
    components: { [key: string]: number },
    installationFee: number,
    deliveryFee: number,
    totalLength: number
  ) => {
    setRampConfig({ monthlyRate, components, installationFee, deliveryFee, totalLength });
  }, []);

  const handleSubmit = async (formData: Partial<Quote>) => {
    const updatedQuote: Partial<Quote> = {
      ...formData,
      ...rampConfig,
      customerId: customer.id,
      rentalRequestId: quote?.rentalRequestId || 'DIRECT_FROM_CUSTOMER',
      createdAt: quote?.createdAt || Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    await onQuoteCreated(updatedQuote);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{quote ? 'Edit Quote' : 'Create New Quote'}</h2>
        <RampPricingCalculator
          onPriceCalculated={handlePriceCalculated}
          customerAddress={customer.address}
          initialComponents={quote?.components}
        />
        <QuoteForm
          quote={quote || {}}
          customer={customer}
          onClose={onClose}
          onSubmit={handleSubmit}
          rampConfig={rampConfig}
        />
      </div>
    </div>
  );
};

export default QuoteFormModal;