// src/components/RampPricingCalculator/TotalCostDisplay.tsx
import React from 'react';

interface TotalCostDisplayProps {
  totalCost: number;
}

const TotalCostDisplay: React.FC<TotalCostDisplayProps> = ({ totalCost }) => (
  <div>
    <label>
      <strong>Total Cost: ${totalCost}</strong>
    </label>
  </div>
);

export default TotalCostDisplay;