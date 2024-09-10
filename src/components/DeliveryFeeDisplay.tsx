// src/components/RampPricingCalculator/DeliveryFeeDisplay.tsx
import React from 'react';

interface DeliveryFeeDisplayProps {
  distance: number;
  deliveryFee: number;
}

const DeliveryFeeDisplay: React.FC<DeliveryFeeDisplayProps> = ({ distance, deliveryFee }) => {
  return (
    <div>
      <h3>Delivery Fee</h3>
      <p>Distance: {distance} miles</p>
      <p>Fee: ${deliveryFee}</p>
    </div>
  );
};

export default DeliveryFeeDisplay;