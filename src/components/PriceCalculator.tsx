import React, { useCallback, useEffect } from 'react';
import { RampComponent } from '../types/types';

interface PriceCalculatorProps {
  selectedComponents: { component: RampComponent; quantity: number }[];
  monthlyRatePerFoot: number;
  onMonthlyRateCalculated: (monthlyRate: number, totalLength: number) => void;
}

const PriceCalculator: React.FC<PriceCalculatorProps> = ({
  selectedComponents,
  monthlyRatePerFoot,
  onMonthlyRateCalculated,
}) => {
  const calculateMonthlyRate = useCallback(() => {
    const totalLength = selectedComponents.reduce((total, { component, quantity }) => {
      return total + (component.length * quantity);
    }, 0);

    const monthlyRate = Math.round(totalLength * monthlyRatePerFoot);

    return { monthlyRate, totalLength };
  }, [selectedComponents, monthlyRatePerFoot]);

  useEffect(() => {
    const { monthlyRate, totalLength } = calculateMonthlyRate();
    onMonthlyRateCalculated(monthlyRate, totalLength);
  }, [calculateMonthlyRate, onMonthlyRateCalculated]);

  return null;
};

export default PriceCalculator;