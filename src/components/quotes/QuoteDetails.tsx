// src/components/QuoteDetails.tsx
import React from 'react';
import { QuoteWithCustomer } from '../../types/common';

interface QuoteDetailsProps {
  quote: QuoteWithCustomer;
  onClose: () => void;
}

const QuoteDetails: React.FC<QuoteDetailsProps> = ({ quote, onClose }) => {
  return (
    <div className="quote-details-modal">
      <div className="quote-details-content">
        <h2>Quote Details</h2>
        <p><strong>Customer Name:</strong> {quote.customerName}</p>
        <p><strong>Customer Address:</strong> {quote.customerAddress}</p>
        <p><strong>Monthly Rate:</strong> ${quote.monthlyRate.toFixed(2)}</p>
        <p><strong>Installation Fee:</strong> ${quote.installationFee.toFixed(2)}</p>
        <p><strong>Delivery Fee:</strong> ${quote.deliveryFee.toFixed(2)}</p>
        <p><strong>Upfront Cost:</strong> ${(quote.installationFee + quote.deliveryFee).toFixed(2)}</p>
        <p><strong>Total Length:</strong> {quote.totalLength} ft</p>
        <p><strong>Status:</strong> {quote.status}</p>
        <h3>Components:</h3>
        <ul>
          {Object.entries(quote.components).map(([componentId, quantity]) => (
            <li key={componentId}>{componentId}: {quantity}</li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default QuoteDetails;