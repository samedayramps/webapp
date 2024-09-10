import React, { useState, useEffect } from 'react';
import PriceVariables from './PriceVariables';
import PriceVariablesManager from './PriceVariablesManager';
import { PriceVariablesType } from '../types/common';
import AddressField from './shared/AddressField';
import { Timestamp } from 'firebase/firestore';

const Settings: React.FC = () => {
  const [priceVariables, setPriceVariables] = useState<PriceVariablesType>({
    id: '',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    baseDeliveryFee: 0,
    deliveryFeePerMile: 0,
    installFeePerRampSection: 0,
    installFeePerLanding: 0,
    monthlyRatePerFoot: 0,
    warehouseAddress: '',
  });

  useEffect(() => {
    fetchInitialPriceVariables();
  }, []);

  const fetchInitialPriceVariables = async () => {
    try {
      const fetchedVariables = await PriceVariablesManager.getVariables();
      console.log('Fetched variables:', fetchedVariables);
      setPriceVariables(fetchedVariables);
    } catch (error) {
      console.error('Error fetching price variables:', error);
    }
  };

  const handleVariablesChange = (updatedVariables: Partial<PriceVariablesType>) => {
    setPriceVariables(prevVariables => ({
      ...prevVariables,
      ...updatedVariables,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const { id, createdAt, updatedAt, ...variablesToSave } = priceVariables;
      await PriceVariablesManager.saveVariables(variablesToSave);
      console.log('Price variables saved successfully');
    } catch (error) {
      console.error('Error saving price variables:', error);
    }
  };

  const handleWarehouseAddressChange = (address: string) => {
    handleVariablesChange({ warehouseAddress: address });
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <section className="price-variables-section">
        <h2>Current Price Variables</h2>
        <PriceVariables 
          variables={priceVariables} 
          onVariablesChange={handleVariablesChange}
        />
        <div>
          <label htmlFor="warehouseAddress">Warehouse Address: </label>
          <AddressField
            value={priceVariables.warehouseAddress}
            onChange={handleWarehouseAddressChange}
            placeholder="Enter warehouse address"
          />
        </div>
        <button onClick={handleSaveChanges}>Save Changes</button>
      </section>
    </div>
  );
};

export default Settings;