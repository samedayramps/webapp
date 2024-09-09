import React, { useState } from 'react';
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
  const [components, setComponents] = useState<{ [key: string]: number }>({});
  const [upfrontFee, setUpfrontFee] = useState<number>(0);
  const [monthlyRate, setMonthlyRate] = useState<number>(0);
  const [installationFee, setInstallationFee] = useState<number>(0);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [totalLength, setTotalLength] = useState<number>(0);

  const handlePriceCalculated = (
    calculatedUpfrontFee: number,
    calculatedMonthlyRate: number,
    calculatedComponents: { [key: string]: number },
    calculatedInstallationFee: number,
    calculatedDeliveryFee: number,
    calculatedTotalLength: number
  ) => {
    setUpfrontFee(calculatedUpfrontFee);
    setMonthlyRate(calculatedMonthlyRate);
    setComponents(calculatedComponents);
    setInstallationFee(calculatedInstallationFee);
    setDeliveryFee(calculatedDeliveryFee);
    setTotalLength(calculatedTotalLength);
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
        installationFee,
        deliveryFee,
        totalLength,
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
        <form onSubmit={handleSubmit}>
          <RampPricingCalculator onPriceCalculated={handlePriceCalculated} />
          <div>
            <strong>Upfront Fee: ${upfrontFee}</strong>
          </div>
          <div>
            <strong>Monthly Rate: ${monthlyRate}</strong>
          </div>
          <div>
            <strong>Installation Fee: ${installationFee}</strong>
          </div>
          <div>
            <strong>Delivery Fee: ${deliveryFee}</strong>
          </div>
          <div>
            <strong>Total Ramp Length: {totalLength} ft</strong>
          </div>
          <button type="submit">Create Quote</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default QuoteForm;