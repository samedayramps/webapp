import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const useDeliveryFee = (distance: number) => {
  const [deliveryFee, setDeliveryFee] = useState(0);

  useEffect(() => {
    const fetchPriceVariables = async () => {
      const docRef = doc(db, 'settings', 'priceVariables');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const baseDeliveryFee = data.baseDeliveryFee || 100;
        const deliveryFeePerMile = data.deliveryFeePerMile || 2;
        
        const calculatedFee = baseDeliveryFee + (distance * deliveryFeePerMile);
        setDeliveryFee(Math.round(calculatedFee));
      }
    };

    fetchPriceVariables();
  }, [distance]);

  return deliveryFee;
};