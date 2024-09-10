// src/components/RampPricingCalculator/SelectedComponentsList.tsx
import React from 'react';
import { RampComponent } from './types';

interface SelectedComponentsListProps {
  selectedComponents: { component: RampComponent; quantity: number }[];
  monthlyRatePerFoot: number;
  onQuantityChange: (index: number, quantity: number) => void;
  onRemoveComponent: (index: number) => void;
}

const SelectedComponentsList: React.FC<SelectedComponentsListProps> = ({
  selectedComponents,
  monthlyRatePerFoot,
  onQuantityChange,
  onRemoveComponent,
}) => (
  <ul>
    {selectedComponents.map(({ component, quantity }, index) => (
      <li key={index}>
        {component.name} - ${(component.length * monthlyRatePerFoot).toFixed(2)}/month
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => onQuantityChange(index, parseInt(e.target.value))}
        />
        <button onClick={() => onRemoveComponent(index)}>Remove</button>
      </li>
    ))}
  </ul>
);

export default SelectedComponentsList;