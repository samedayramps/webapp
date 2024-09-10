import React from 'react';
import PriceVariablesManager from './PriceVariablesManager';

interface PriceVariablesProps {
  onClose: () => void;
}

const PriceVariables: React.FC<PriceVariablesProps> = ({ onClose }) => {
  const handleVariablesLoaded = (variables: any) => {
    console.log('Price variables loaded:', variables);
    // You can add more logic here if needed
  };

  return (
    <div>
      <PriceVariablesManager onVariablesLoaded={handleVariablesLoaded} />
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default PriceVariables;