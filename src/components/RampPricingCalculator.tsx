import React, { useState, useEffect, useCallback } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface RampComponent {
  id: string;
  name: string;
  price: number;
  length: number;
  isLanding: boolean;
}

interface RampPricingCalculatorProps {
  onPriceCalculated: (
    upfrontFee: number,
    monthlyRate: number,
    components: { [key: string]: number },
    installationFee: number,
    deliveryFee: number,
    totalLength: number
  ) => void;
}

const rampComponents: RampComponent[] = [
  { id: 'R4', name: '4ft Ramp', price: 100, length: 4, isLanding: false },
  { id: 'R5', name: '5ft Ramp', price: 120, length: 5, isLanding: false },
  { id: 'R6', name: '6ft Ramp', price: 140, length: 6, isLanding: false },
  { id: 'R7', name: '7ft Ramp', price: 160, length: 7, isLanding: false },
  { id: 'R8', name: '8ft Ramp', price: 180, length: 8, isLanding: false },
  { id: 'L54', name: '5x4 Landing', price: 200, length: 0, isLanding: true },
  { id: 'L55', name: '5x5 Landing', price: 220, length: 0, isLanding: true },
  { id: 'L58', name: '5x8 Landing', price: 240, length: 0, isLanding: true },
];

const RampPricingCalculator: React.FC<RampPricingCalculatorProps> = ({ onPriceCalculated }) => {
  const [selectedComponents, setSelectedComponents] = useState<{ component: RampComponent; quantity: number }[]>([]);
  const [installationFee, setInstallationFee] = useState(500);
  const [deliveryFee, setDeliveryFee] = useState(200);
  const [rentalDuration, setRentalDuration] = useState(1);
  const [componentPrices, setComponentPrices] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchPriceVariables = async () => {
      const docRef = doc(db, 'settings', 'priceVariables');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setInstallationFee(data.installationFee);
        setDeliveryFee(data.deliveryFee);
        setComponentPrices(data.componentPrices);
      }
    };
    fetchPriceVariables();
  }, []);

  const calculatePrice = useCallback(() => {
    const totalComponentCost = selectedComponents.reduce((total, { component, quantity }) => {
      return total + component.price * quantity;
    }, 0);

    const upfrontFee = totalComponentCost + installationFee + deliveryFee;
    const monthlyRate = Math.round(upfrontFee / rentalDuration);

    const componentsObject = selectedComponents.reduce((obj, { component, quantity }) => {
      obj[component.id] = quantity;
      return obj;
    }, {} as { [key: string]: number });

    const totalLength = selectedComponents.reduce((total, { component, quantity }) => {
      // Only add length for non-landing components
      return total + (component.isLanding ? 0 : component.length * quantity);
    }, 0);

    onPriceCalculated(upfrontFee, monthlyRate, componentsObject, installationFee, deliveryFee, totalLength);
  }, [selectedComponents, installationFee, deliveryFee, rentalDuration, onPriceCalculated]);

  useEffect(() => {
    calculatePrice();
  }, [calculatePrice]);

  const handleAddComponent = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const component = rampComponents.find(c => c.id === selectedId);
    if (component) {
      setSelectedComponents(prev => [...prev, { component, quantity: 1 }]);
    }
    e.target.value = ''; // Reset dropdown
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    setSelectedComponents(prev => 
      prev.map((item, i) => i === index ? { ...item, quantity } : item)
    );
  };

  const handleRemoveComponent = (index: number) => {
    setSelectedComponents(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h3>Ramp Components</h3>
      <select onChange={handleAddComponent} defaultValue="">
        <option value="" disabled>Select a component</option>
        {rampComponents.map((component) => (
          <option key={component.id} value={component.id}>
            {component.name} (${componentPrices[component.id] || component.price})
          </option>
        ))}
      </select>
      <ul>
        {selectedComponents.map(({ component, quantity }, index) => (
          <li key={index}>
            {component.name} - ${componentPrices[component.id] || component.price}
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
            />
            <button onClick={() => handleRemoveComponent(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>
        <label>
          Installation Fee:
          <input
            type="number"
            min="0"
            value={installationFee}
            onChange={(e) => setInstallationFee(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Delivery Fee:
          <input
            type="number"
            min="0"
            value={deliveryFee}
            onChange={(e) => setDeliveryFee(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Rental Duration (months):
          <input
            type="number"
            min="1"
            value={rentalDuration}
            onChange={(e) => setRentalDuration(parseInt(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
};

export default RampPricingCalculator;