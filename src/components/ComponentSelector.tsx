// src/components/RampPricingCalculator/ComponentSelector.tsx
import React from 'react';
import { RampComponent } from '../types/common';

interface ComponentSelectorProps {
  rampComponents: RampComponent[];
  monthlyRatePerFoot: number;
  onAddComponent: (componentId: string) => void;
}

const ComponentSelector: React.FC<ComponentSelectorProps> = ({ rampComponents, monthlyRatePerFoot, onAddComponent }) => (
  <select onChange={(e) => onAddComponent(e.target.value)} defaultValue="">
    <option value="" disabled>Select a component</option>
    {rampComponents.map((component) => (
      <option key={component.id} value={component.id}>
        {component.name} (${(component.length * monthlyRatePerFoot).toFixed(2)}/month)
      </option>
    ))}
  </select>
);

export default ComponentSelector;