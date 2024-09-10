// src/components/QuoteDetails.tsx
import React from 'react';
import { Quote } from '../types/common';

interface QuoteDetailsProps {
  quote: Quote;
}

const QuoteDetails: React.FC<QuoteDetailsProps> = ({ quote }) => (
  <div>
    <div><strong>Monthly Rate:</strong> ${quote.monthlyRate}</div>
    <div><strong>Installation Fee:</strong> ${quote.installationFee}</div>
    <div><strong>Delivery Fee:</strong> ${quote.deliveryFee}</div>
    <div><strong>Total Ramp Length:</strong> {quote.totalLength} ft</div>
    <div><strong>Status:</strong> {quote.status}</div>
  </div>
);

export default QuoteDetails;