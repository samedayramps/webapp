import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { RampComponent, PriceVariablesType } from '../../types/common';
import ComponentSelector from './ComponentSelector';
import SelectedComponentsList from '../SelectedComponentsList';
import { calculatePricing } from '../../utils/pricingCalculations';
import { CrudService } from '../../services/crudService';
import './RampPricingCalculator.css';

const priceVariablesService = new CrudService<PriceVariablesType>('priceVariables');

interface RampPricingCalculatorProps {
  onPriceCalculated: (
    monthlyRate: number,
    components: { [key: string]: number },
    installationFee: number,
    deliveryFee: number,
    totalLength: number
  ) => void;
  customerAddress: string;
  initialComponents?: { [key: string]: number };
}

const RampPricingCalculator: React.FC<RampPricingCalculatorProps> = ({
  onPriceCalculated,
  customerAddress,
  initialComponents,
}) => {
  const [rampComponents, setRampComponents] = useState<RampComponent[]>([]);
  const [selectedComponents, setSelectedComponents] = useState<{ component: RampComponent; quantity: number }[]>([]);
  const [monthlyRatePerFoot, setMonthlyRatePerFoot] = useState(0);
  const [priceVariables, setPriceVariables] = useState<PriceVariablesType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const components: RampComponent[] = [
        { id: '1', name: 'Ramp Section 4ft', length: 4, isLanding: false },
        { id: '2', name: 'Ramp Section 5ft', length: 5, isLanding: false },
        { id: '3', name: 'Ramp Section 6ft', length: 6, isLanding: false },
        { id: '4', name: 'Ramp Section 7ft', length: 7, isLanding: false },
        { id: '5', name: 'Ramp Section 8ft', length: 8, isLanding: false },
        { id: '6', name: 'Landing 5x4', length: 5, isLanding: true },
        { id: '7', name: 'Landing 5x5', length: 5, isLanding: true },
        { id: '8', name: 'Landing 5x8', length: 5, isLanding: true },
      ];
      setRampComponents(components);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (initialComponents && rampComponents.length > 0) {
      const initialSelected = Object.entries(initialComponents).map(([id, quantity]) => ({
        component: rampComponents.find(c => c.id === id)!,
        quantity,
      }));
      setSelectedComponents(initialSelected);
    }
  }, [initialComponents, rampComponents]);

  const handleAddComponent = useCallback((componentId: string) => {
    const component = rampComponents.find(c => c.id === componentId);
    if (component) {
      setSelectedComponents(prev => [...prev, { component, quantity: 1 }]);
    }
  }, [rampComponents]);

  const handleQuantityChange = useCallback((index: number, quantity: number) => {
    setSelectedComponents(prev => {
      const newComponents = [...prev];
      newComponents[index].quantity = quantity;
      return newComponents;
    });
  }, []);

  const handleRemoveComponent = useCallback((index: number) => {
    setSelectedComponents(prev => prev.filter((_, i) => i !== index));
  }, []);

  useEffect(() => {
    const fetchPriceVariables = async () => {
      const variables = await priceVariablesService.getAll();
      if (variables.length > 0) {
        setPriceVariables(variables[0]);
        setMonthlyRatePerFoot(variables[0].monthlyRatePerFoot);
      }
    };
    fetchPriceVariables();
  }, []);

  const pricing = useMemo(() => {
    if (!priceVariables) return null;
    return calculatePricing(selectedComponents, customerAddress, priceVariables);
  }, [selectedComponents, customerAddress, priceVariables]);

  const memoizedOnPriceCalculated = useCallback(() => {
    if (!pricing) return;
    const { monthlyRate, installationFee, deliveryFee, totalLength } = pricing;
    const componentsObject = selectedComponents.reduce((acc, { component, quantity }) => {
      acc[component.id] = quantity;
      return acc;
    }, {} as { [key: string]: number });

    onPriceCalculated(monthlyRate, componentsObject, installationFee, deliveryFee, totalLength);
  }, [pricing, selectedComponents, onPriceCalculated]);

  useEffect(() => {
    if (pricing) {
      memoizedOnPriceCalculated();
    }
  }, [memoizedOnPriceCalculated, pricing]);

  return (
    <div className="ramp-pricing-calculator">
      <h3>Ramp Configuration</h3>
      <ComponentSelector
        rampComponents={rampComponents}
        monthlyRatePerFoot={monthlyRatePerFoot}
        onAddComponent={handleAddComponent}
      />
      <SelectedComponentsList
        selectedComponents={selectedComponents}
        monthlyRatePerFoot={monthlyRatePerFoot}
        onQuantityChange={handleQuantityChange}
        onRemoveComponent={handleRemoveComponent}
      />
    </div>
  );
};

export default RampPricingCalculator;