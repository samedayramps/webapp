import React, { useState, useEffect } from 'react';
import PriceVariables from '../components/PriceVariables';
import { PriceVariablesType } from '../types/common';
import { CrudService } from '../services/crudService';

const priceVariablesService = new CrudService<PriceVariablesType>('priceVariables');

const AdminSettings: React.FC = () => {
  const [priceVariables, setPriceVariables] = useState<PriceVariablesType | null>(null);

  useEffect(() => {
    fetchPriceVariables();
  }, []);

  const fetchPriceVariables = async () => {
    const variables = await priceVariablesService.getAll();
    if (variables.length > 0) {
      setPriceVariables(variables[0]);
    }
  };

  const handleVariablesChange = async (updatedVariables: Partial<PriceVariablesType>) => {
    if (priceVariables) {
      const updated = { ...priceVariables, ...updatedVariables };
      await priceVariablesService.update(priceVariables.id, updated);
      setPriceVariables(updated);
    }
  };

  return (
    <div>
      <h1>Admin Settings</h1>
      {priceVariables && (
        <PriceVariables
          variables={priceVariables}
          onVariablesChange={handleVariablesChange}
        />
      )}
    </div>
  );
};

export default AdminSettings;