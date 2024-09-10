import React, { useState, useCallback } from 'react';
import { Customer, Quote } from '../types/common';
import { CrudService } from '../services/crudService';
import RampPricingCalculator from './RampPricingCalculator';
import CustomerInfo from './CustomerInfo';

interface QuoteFormProps {
  customer: Customer;
  onClose: () => void;
  onQuoteCreated: () => void;
}

const quoteService = new CrudService<Quote>('quotes');
const customerService = new CrudService<Customer>('customers');

const QuoteForm: React.FC<QuoteFormProps> = ({ customer, onClose, onQuoteCreated }) => {
  const [quote, setQuote] = useState<Partial<Quote>>({
    components: {},
    monthlyRate: 0,
    installationFee: 0,
    deliveryFee: 0,
    totalLength: 0,
  });

  const handlePriceCalculated = useCallback((
    monthlyRate: number,
    components: { [key: string]: number },
    installationFee: number,
    deliveryFee: number,
    totalLength: number
  ) => {
    setQuote(prevQuote => ({
      ...prevQuote,
      monthlyRate,
      components,
      installationFee,
      deliveryFee,
      totalLength
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const quoteData: Omit<Quote, 'id' | 'createdAt' | 'updatedAt'> = {
        customerId: customer.id,
        rentalRequestId: customer.rentalRequestId || '',
        components: quote.components || {},
        monthlyRate: quote.monthlyRate || 0,
        installationFee: quote.installationFee || 0,
        deliveryFee: quote.deliveryFee || 0,
        totalLength: quote.totalLength || 0,
        status: 'pending',
      };

      const newQuoteId = await quoteService.create(quoteData);
      await customerService.update(customer.id, { quoteId: newQuoteId });

      alert('Quote created successfully!');
      onQuoteCreated();
      onClose();
    } catch (error) {
      console.error('Error creating quote: ', error);
      alert('Error creating quote. Please try again.');
    }
  };

  return (
    <div className="quote-form-overlay">
      <div className="quote-form">
        <h2>Create Quote for {customer.firstName} {customer.lastName}</h2>
        <CustomerInfo customer={customer} />
        <RampPricingCalculator 
          onPriceCalculated={handlePriceCalculated} 
          customerAddress={customer.address}
        />
        <button onClick={handleSubmit}>Create Quote</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default QuoteForm;