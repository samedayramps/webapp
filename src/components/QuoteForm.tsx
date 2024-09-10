import React, { useState, useCallback } from 'react';
import { Quote, Customer } from '../types/common';
import { CrudService } from '../services/crudService';
import RampPricingCalculator from './RampPricingCalculator';

interface QuoteFormProps {
  quote: Quote;
  customer: Customer;
  onClose: () => void;
  onQuoteCreated: () => void;
}

const quoteService = new CrudService<Quote>('quotes');

const QuoteForm: React.FC<QuoteFormProps> = ({ quote, customer, onClose, onQuoteCreated }) => {
  const [editedQuote, setEditedQuote] = useState<Partial<Quote>>(quote);

  const handlePriceCalculated = useCallback((
    monthlyRate: number,
    components: { [key: string]: number },
    installationFee: number,
    deliveryFee: number,
    totalLength: number
  ) => {
    setEditedQuote(prevQuote => ({
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
      await quoteService.update(quote.id, editedQuote as Quote);
      onQuoteCreated();
      onClose();
    } catch (error) {
      console.error('Error updating quote: ', error);
      alert('Error updating quote. Please try again.');
    }
  };

  const customerName = `${customer.firstName} ${customer.lastName}`;
  const customerAddress = customer.address;

  return (
    <div className="quote-form-overlay">
      <div className="quote-form">
        <h2>Edit Quote for {customerName}</h2>
        <div className="customer-info">
          <p><strong>Customer:</strong> {customerName}</p>
          <p><strong>Address:</strong> {customerAddress}</p>
        </div>
        <RampPricingCalculator 
          onPriceCalculated={handlePriceCalculated} 
          customerAddress={customerAddress || ''}
          initialComponents={editedQuote.components}
        />
        <div>
          <strong>Monthly Rate:</strong> ${editedQuote.monthlyRate?.toFixed(2)}
        </div>
        <div>
          <strong>Installation Fee:</strong> ${editedQuote.installationFee?.toFixed(2)}
        </div>
        <div>
          <strong>Delivery Fee:</strong> ${editedQuote.deliveryFee?.toFixed(2)}
        </div>
        <div>
          <strong>Total Ramp Length:</strong> {editedQuote.totalLength} ft
        </div>
        <button onClick={handleSubmit}>Update Quote</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default QuoteForm;