import React, { useState, useEffect, useCallback } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface RampComponent {
  id: string;
  name: string;
  price: number;
}

interface RampPricingCalculatorProps {
  onPriceCalculated: (upfrontFee: number, monthlyRate: number, components: { [key: string]: number }, installationFee: number, deliveryFee: number) => void;
}

const rampComponents: RampComponent[] = [
  { id: 'RS4', name: 'RS4 Ramp Section', price: 100 },
  { id: 'RS5', name: 'RS5 Ramp Section', price: 120 },
  { id: 'RS6', name: 'RS6 Ramp Section', price: 140 },
  { id: 'RS7', name: 'RS7 Ramp Section', price: 160 },
  { id: 'RS8', name: 'RS8 Ramp Section', price: 180 },
  { id: 'L54', name: 'L54 Landing', price: 200 },
  { id: 'L55', name: 'L55 Landing', price: 220 },
  { id: 'L58', name: 'L58 Landing', price: 240 },
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

    onPriceCalculated(upfrontFee, monthlyRate, componentsObject, installationFee, deliveryFee);
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
        {Object.entries(componentPrices).map(([id, price]) => (
          <option key={id} value={id}>
            {id} (${price})
          </option>
        ))}
      </select>
      <ul>
        {selectedComponents.map(({ component, quantity }, index) => (
          <li key={index}>
            {component.name} - ${component.price}
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