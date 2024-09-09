import React, { useState } from 'react';
import { Customer, Quote } from '../types/common';
import { CrudService } from '../services/crudService';

interface QuoteFormProps {
  customer: Customer;
  onClose: () => void;
  onQuoteCreated: () => void;
}

const quoteService = new CrudService<Quote>('quotes');
const customerService = new CrudService<Customer>('customers');

const rampComponents = ['RS4', 'RS5', 'RS6', 'RS7', 'RS8', 'L54', 'L55', 'L58'];

const QuoteForm: React.FC<QuoteFormProps> = ({ customer, onClose, onQuoteCreated }) => {
  const [components, setComponents] = useState<{ [key: string]: number }>({});
  const [upfrontFee, setUpfrontFee] = useState<number>(0);
  const [monthlyRate, setMonthlyRate] = useState<number>(0);

  const handleComponentChange = (component: string, quantity: number) => {
    setComponents(prev => ({ ...prev, [component]: quantity }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const quoteData: Omit<Quote, 'id' | 'createdAt' | 'updatedAt'> = {
        customerId: customer.id,
        rentalRequestId: customer.rentalRequestId || '',
        components,
        upfrontFee,
        monthlyRate,
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
        <form onSubmit={handleSubmit}>
          <h3>Ramp Components</h3>
          {rampComponents.map(component => (
            <div key={component}>
              <label>
                {component}:
                <input
                  type="number"
                  min="0"
                  value={components[component] || 0}
                  onChange={(e) => handleComponentChange(component, parseInt(e.target.value))}
                />
              </label>
            </div>
          ))}
          <h3>Pricing</h3>
          <div>
            <label>
              Upfront Fee (Delivery + Install):
              <input
                type="number"
                min="0"
                value={upfrontFee}
                onChange={(e) => setUpfrontFee(parseFloat(e.target.value))}
              />
            </label>
          </div>
          <div>
            <label>
              Monthly Rate:
              <input
                type="number"
                min="0"
                value={monthlyRate}
                onChange={(e) => setMonthlyRate(parseFloat(e.target.value))}
              />
            </label>
          </div>
          <button type="submit">Create Quote</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default QuoteForm;