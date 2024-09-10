import React from 'react';

interface FeesAndRatesDisplayProps {
  installationFee: number;
  deliveryFee: number;
  monthlyRate: number;
}

const FeesAndRatesDisplay: React.FC<FeesAndRatesDisplayProps> = ({
  installationFee,
  deliveryFee,
  monthlyRate
}) => {
  return (
    <div>
      <h3>Fees and Rates</h3>
      <p><strong>Installation Fee:</strong> ${installationFee}</p>
      <p><strong>Delivery Fee:</strong> ${deliveryFee}</p>
      <p><strong>Monthly Rental Rate:</strong> ${monthlyRate}</p>
    </div>
  );
};

export default FeesAndRatesDisplay;