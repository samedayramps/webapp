import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface PriceVariablesData {
  installationFee: number;
  deliveryFee: number;
  componentPrices: { [key: string]: number };
}

const PriceVariables: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [variables, setVariables] = useState<PriceVariablesData>({
    installationFee: 500,
    deliveryFee: 200,
    componentPrices: {
      R4: 100,
      R5: 120,
      R6: 140,
      R7: 160,
      R8: 180,
      L54: 200,
      L55: 220,
      L58: 240,
    },
  });

  useEffect(() => {
    const fetchPriceVariables = async () => {
      const docRef = doc(db, 'settings', 'priceVariables');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setVariables(docSnap.data() as PriceVariablesData);
      }
    };
    fetchPriceVariables();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'installationFee' || name === 'deliveryFee') {
      setVariables(prev => ({ ...prev, [name]: Number(value) }));
    } else {
      setVariables(prev => ({
        ...prev,
        componentPrices: { ...prev.componentPrices, [name]: Number(value) },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const docRef = doc(db, 'settings', 'priceVariables');
    await setDoc(docRef, variables);
    alert('Price variables updated successfully!');
    onClose();
  };

  return (
    <div className="price-variables-overlay">
      <div className="price-variables-form">
        <h2>Price Variables</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Installation Fee:</label>
            <input
              type="number"
              name="installationFee"
              value={variables.installationFee}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Delivery Fee:</label>
            <input
              type="number"
              name="deliveryFee"
              value={variables.deliveryFee}
              onChange={handleInputChange}
            />
          </div>
          <h3>Component Prices:</h3>
          {Object.entries(variables.componentPrices).map(([component, price]) => (
            <div key={component}>
              <label>{component}:</label>
              <input
                type="number"
                name={component}
                value={price}
                onChange={handleInputChange}
              />
            </div>
          ))}
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default PriceVariables;