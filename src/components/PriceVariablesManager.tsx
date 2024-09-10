// src/components/RampPricingCalculator/PriceVariablesManager.tsx
import React, { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface PriceVariablesManagerProps {
  onVariablesLoaded: (variables: {
    baseDeliveryFee: number;
    deliveryFeePerMile: number;
    installFeePerRampSection: number;
    installFeePerLanding: number;
    monthlyRatePerFoot: number;
    warehouseAddress: string;
  }) => void;
}

const PriceVariablesManager: React.FC<PriceVariablesManagerProps> = ({ onVariablesLoaded }) => {
  useEffect(() => {
    const fetchPriceVariables = async () => {
      console.log('Fetching price variables in PriceVariablesManager');
      const docRef = doc(db, 'settings', 'priceVariables');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log('Fetched data:', data);
        onVariablesLoaded({
          baseDeliveryFee: data.baseDeliveryFee || 100,
          deliveryFeePerMile: data.deliveryFeePerMile || 2,
          installFeePerRampSection: data.installFeePerRampSection || 50,
          installFeePerLanding: data.installFeePerLanding || 100,
          monthlyRatePerFoot: data.monthlyRatePerFoot || 10,
          warehouseAddress: data.warehouseAddress || '',
        });
      }
    };
    fetchPriceVariables();
  }, [onVariablesLoaded]);

  return null;
};

export default PriceVariablesManager;