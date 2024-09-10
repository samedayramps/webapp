// src/components/RampPricingCalculator/DistanceCalculator.tsx
import React, { useEffect, useState } from 'react';

interface DistanceCalculatorProps {
  warehouseAddress: string;
  customerAddress: string;
  baseDeliveryFee: number;
  deliveryFeePerMile: number;
  onDistanceCalculated: (distance: number, fee: number) => void;
}

const DistanceCalculator: React.FC<DistanceCalculatorProps> = ({
  warehouseAddress,
  customerAddress,
  baseDeliveryFee,
  deliveryFeePerMile,
  onDistanceCalculated,
}) => {
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=geometry`;
      script.async = true;
      script.defer = true;
      script.addEventListener('load', () => setIsGoogleMapsLoaded(true));
      document.head.appendChild(script);
    } else {
      setIsGoogleMapsLoaded(true);
    }
  }, []);

  useEffect(() => {
    const calculateDistance = () => {
      if (isGoogleMapsLoaded && warehouseAddress && customerAddress) {
        const service = new google.maps.DistanceMatrixService();
        const request = {
          origins: [warehouseAddress],
          destinations: [customerAddress],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL,
        };

        service.getDistanceMatrix(request, (response, status) => {
          if (status === 'OK' && response) {
            const distance = response.rows[0].elements[0].distance.value;
            const distanceInMiles = distance / 1609.34;
            const roundedDistance = Math.round(distanceInMiles * 10) / 10;
            
            const calculatedDeliveryFee = baseDeliveryFee + (roundedDistance * deliveryFeePerMile);
            const roundedDeliveryFee = Math.round(calculatedDeliveryFee);
            
            onDistanceCalculated(roundedDistance, roundedDeliveryFee);
          }
        });
      }
    };

    calculateDistance();
  }, [isGoogleMapsLoaded, warehouseAddress, customerAddress, baseDeliveryFee, deliveryFeePerMile, onDistanceCalculated]);

  return null;
};

export default DistanceCalculator;