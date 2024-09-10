import React from 'react';
import { PriceVariablesType } from '../types/common';

interface PriceVariablesProps {
  variables: PriceVariablesType;
  onVariablesChange: (updatedVariables: Partial<PriceVariablesType>) => void;
}

const PriceVariables: React.FC<PriceVariablesProps> = ({ variables, onVariablesChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onVariablesChange({
      [name]: parseFloat(value),
    });
  };

  return (
    <div className="price-variables">
      <div>
        <label htmlFor="baseDeliveryFee">Base Delivery Fee ($): </label>
        <input
          type="number"
          id="baseDeliveryFee"
          name="baseDeliveryFee"
          value={variables.baseDeliveryFee}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="deliveryFeePerMile">Delivery Fee Per Mile ($): </label>
        <input
          type="number"
          id="deliveryFeePerMile"
          name="deliveryFeePerMile"
          value={variables.deliveryFeePerMile}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="installFeePerRampSection">Install Fee Per Ramp Section ($): </label>
        <input
          type="number"
          id="installFeePerRampSection"
          name="installFeePerRampSection"
          value={variables.installFeePerRampSection}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="installFeePerLanding">Install Fee Per Landing ($): </label>
        <input
          type="number"
          id="installFeePerLanding"
          name="installFeePerLanding"
          value={variables.installFeePerLanding}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="monthlyRatePerFoot">Monthly Rate Per Foot ($): </label>
        <input
          type="number"
          id="monthlyRatePerFoot"
          name="monthlyRatePerFoot"
          value={variables.monthlyRatePerFoot}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default PriceVariables;