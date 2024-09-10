// src/components/RampPricingCalculator/RampPricingCalculator.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { RampComponent, RampPricingCalculatorProps } from './types';
import RampComponentsManager from './RampComponentsManager';
import PriceVariablesManager from './PriceVariablesManager';
import DistanceCalculator from './DistanceCalculator';
import PriceCalculator from './PriceCalculator';
import InstallationFeeCalculator from './InstallationFeeCalculator';
import FeesAndRatesDisplay from './FeesAndRatesDisplay';
import './RampPricingCalculator.css'; // Make sure to create this CSS file

const rampComponents: RampComponent[] = [
  { id: 'R4', name: '4ft Ramp', length: 4, isLanding: false },
  { id: 'R5', name: '5ft Ramp', length: 5, isLanding: false },
  { id: 'R6', name: '6ft Ramp', length: 6, isLanding: false },
  { id: 'R7', name: '7ft Ramp', length: 7, isLanding: false },
  { id: 'R8', name: '8ft Ramp', length: 8, isLanding: false },
  { id: 'L54', name: '5x4 Landing', length: 5, isLanding: true },
  { id: 'L55', name: '5x5 Landing', length: 5, isLanding: true },
  { id: 'L58', name: '5x8 Landing', length: 5, isLanding: true },
];

const RampPricingCalculator: React.FC<RampPricingCalculatorProps> = ({ onPriceCalculated, customerAddress, initialComponents }) => {
  const [selectedComponents, setSelectedComponents] = useState<{ component: RampComponent; quantity: number }[]>([]);
  const [priceVariables, setPriceVariables] = useState({
    baseDeliveryFee: 100,
    deliveryFeePerMile: 2,
    installFeePerRampSection: 50,
    installFeePerLanding: 100,
    monthlyRatePerFoot: 10,
    warehouseAddress: '',
  });
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [monthlyRate, setMonthlyRate] = useState(0);
  const [installationFee, setInstallationFee] = useState(0);
  const [totalLength, setTotalLength] = useState(0);

  useEffect(() => {
    if (initialComponents) {
      const initialSelectedComponents = Object.entries(initialComponents).map(([id, quantity]) => {
        const component = rampComponents.find(c => c.id === id);
        return component ? { component, quantity } : null;
      }).filter((item): item is { component: RampComponent; quantity: number } => item !== null);

      setSelectedComponents(initialSelectedComponents);
    }
  }, [initialComponents]);

  const handleAddComponent = (selectedId: string) => {
    const component = rampComponents.find(c => c.id === selectedId);
    if (component) {
      setSelectedComponents(prev => [...prev, { component, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    setSelectedComponents(prev => 
      prev.map((item, i) => i === index ? { ...item, quantity } : item)
    );
  };

  const handleRemoveComponent = (index: number) => {
    setSelectedComponents(prev => prev.filter((_, i) => i !== index));
  };

  const handleMonthlyRateCalculated = useCallback((calculatedMonthlyRate: number, calculatedTotalLength: number) => {
    setMonthlyRate(calculatedMonthlyRate);
    setTotalLength(calculatedTotalLength);
  }, []);

  const handleInstallationFeeCalculated = useCallback((calculatedInstallationFee: number) => {
    setInstallationFee(calculatedInstallationFee);
  }, []);

  const handlePriceCalculated = useCallback(() => {
    onPriceCalculated(
      monthlyRate,
      selectedComponents.reduce((obj, { component, quantity }) => {
        obj[component.id] = quantity;
        return obj;
      }, {} as { [key: string]: number }),
      installationFee,
      deliveryFee,
      totalLength
    );
  }, [onPriceCalculated, monthlyRate, selectedComponents, installationFee, deliveryFee, totalLength]);

  useEffect(() => {
    handlePriceCalculated();
  }, [handlePriceCalculated]);

  return (
    <div className="ramp-pricing-calculator">
      <PriceVariablesManager onVariablesLoaded={setPriceVariables} />
      
      <DistanceCalculator
        warehouseAddress={priceVariables.warehouseAddress}
        customerAddress={customerAddress}
        baseDeliveryFee={priceVariables.baseDeliveryFee}
        deliveryFeePerMile={priceVariables.deliveryFeePerMile}
        onDistanceCalculated={(_, fee: number) => {
          setDeliveryFee(fee);
        }}
      />

      <div className="ramp-pricing-calculator-component">
        <h3>Ramp Components</h3>
        <RampComponentsManager
          rampComponents={rampComponents}
          selectedComponents={selectedComponents}
          monthlyRatePerFoot={priceVariables.monthlyRatePerFoot}
          onAddComponent={handleAddComponent}
          onQuantityChange={handleQuantityChange}
          onRemoveComponent={handleRemoveComponent}
        />
      </div>

      <PriceCalculator
        selectedComponents={selectedComponents}
        monthlyRatePerFoot={priceVariables.monthlyRatePerFoot}
        onMonthlyRateCalculated={handleMonthlyRateCalculated}
      />

      <InstallationFeeCalculator
        selectedComponents={selectedComponents}
        installFeePerRampSection={priceVariables.installFeePerRampSection}
        installFeePerLanding={priceVariables.installFeePerLanding}
        onInstallationFeeCalculated={handleInstallationFeeCalculated}
      />

      <div className="ramp-pricing-calculator-component">
        <h3>Fees and Rates Summary</h3>
        <FeesAndRatesDisplay
          installationFee={installationFee}
          deliveryFee={deliveryFee}
          monthlyRate={monthlyRate}
        />
      </div>
    </div>
  );
};

export default React.memo(RampPricingCalculator);