import React from 'react';
import { RampComponent } from '../../types/types';

interface RampComponentsManagerProps {
  rampComponents: RampComponent[];
  selectedComponents: { component: RampComponent; quantity: number }[];
  monthlyRatePerFoot: number;
  onAddComponent: (id: string) => void;
  onQuantityChange: (index: number, quantity: number) => void;
  onRemoveComponent: (index: number) => void;
}

const RampComponentsManager: React.FC<RampComponentsManagerProps> = ({
  rampComponents,
  selectedComponents,
  monthlyRatePerFoot,
  onAddComponent,
  onQuantityChange,
  onRemoveComponent,
}) => {
  return (
    <div>
      <h4>Available Components:</h4>
      <ul>
        {rampComponents.map((component) => (
          <li key={component.id}>
            {component.name} {/* Removed the length unit */}
            <button onClick={() => onAddComponent(component.id)}>Add</button>
          </li>
        ))}
      </ul>

      <h4>Selected Components:</h4>
      <ul>
        {selectedComponents.map(({ component, quantity }, index) => (
          <li key={`${component.id}-${index}`}>
            {component.name} ({component.length}ft)
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => onQuantityChange(index, parseInt(e.target.value, 10))}
            />
            <button onClick={() => onRemoveComponent(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RampComponentsManager;