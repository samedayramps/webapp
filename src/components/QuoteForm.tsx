import React, { useState } from 'react';
import { Quote, Customer } from '../types/common';

interface QuoteFormProps {
  quote: Partial<Quote>;
  customer: Customer;
  onClose: () => void;
  onSubmit: (quote: Partial<Quote>) => Promise<void>;
  rampConfig: {
    monthlyRate: number;
    components: { [key: string]: number };
    installationFee: number;
    deliveryFee: number;
    totalLength: number;
  };
}

const QuoteForm: React.FC<QuoteFormProps> = ({ quote, customer, onClose, onSubmit, rampConfig }) => {
  const [status, setStatus] = useState(quote.status || 'pending');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ ...quote, status });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Quote Summary</h3>
      <p>Customer: {customer.firstName} {customer.lastName}</p>
      <p>Address: {customer.address}</p>
      <p>Monthly Rate: ${rampConfig.monthlyRate.toFixed(2)}</p>
      <p>Installation Fee: ${rampConfig.installationFee.toFixed(2)}</p>
      <p>Delivery Fee: ${rampConfig.deliveryFee.toFixed(2)}</p>
      <p>Total Ramp Length: {rampConfig.totalLength} ft</p>
      <h4>Components:</h4>
      <ul>
        {Object.entries(rampConfig.components).map(([componentId, quantity]) => (
          <li key={componentId}>{componentId}: {quantity}</li>
        ))}
      </ul>
      <label>
        Status:
        <select value={status} onChange={(e) => setStatus(e.target.value as Quote['status'])}>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </label>
      <button type="submit">Save Quote</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default QuoteForm;