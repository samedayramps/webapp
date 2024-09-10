import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const useInstallationFee = (ramps: number, landings: number) => {
  const [feePerRamp, setFeePerRamp] = useState(50); // Default values
  const [feePerLanding, setFeePerLanding] = useState(100);

  useEffect(() => {
    const fetchInstallationFees = async () => {
      const docRef = doc(db, 'settings', 'priceVariables');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFeePerRamp(data.installFeePerRamp);
        setFeePerLanding(data.installFeePerLanding);
      }
    };
    fetchInstallationFees();
  }, []);

  return (ramps * feePerRamp) + (landings * feePerLanding);
};