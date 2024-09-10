import React, { useCallback, useEffect } from 'react';
import { RampComponent } from './types';

interface InstallationFeeCalculatorProps {
  selectedComponents: { component: RampComponent; quantity: number }[];
  installFeePerRampSection: number;
  installFeePerLanding: number;
  onInstallationFeeCalculated: (installationFee: number) => void;
}

const InstallationFeeCalculator: React.FC<InstallationFeeCalculatorProps> = ({
  selectedComponents,
  installFeePerRampSection,
  installFeePerLanding,
  onInstallationFeeCalculated,
}) => {
  const calculateInstallationFee = useCallback(() => {
    return selectedComponents.reduce((total, { component, quantity }) => {
      if (component.isLanding) {
        return total + (installFeePerLanding * quantity);
      } else {
        return total + (installFeePerRampSection * quantity);
      }
    }, 0);
  }, [selectedComponents, installFeePerRampSection, installFeePerLanding]);

  useEffect(() => {
    const installationFee = calculateInstallationFee();
    onInstallationFeeCalculated(installationFee);
  }, [calculateInstallationFee, onInstallationFeeCalculated]);

  return null;
};

export default InstallationFeeCalculator;