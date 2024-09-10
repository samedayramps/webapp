import { RampComponent, PriceVariablesType } from '../types/common';

interface PricingResult {
  monthlyRate: number;
  installationFee: number;
  deliveryFee: number;
  totalLength: number;
}

export const calculatePricing = (
  selectedComponents: { component: RampComponent; quantity: number }[],
  customerAddress: string,
  priceVariables: PriceVariablesType
): PricingResult => {
  let totalLength = 0;
  let installationFee = 0;

  selectedComponents.forEach(({ component, quantity }) => {
    totalLength += component.length * quantity;
    installationFee += component.isLanding
      ? priceVariables.installFeePerLanding * quantity
      : priceVariables.installFeePerRampSection * quantity;
  });

  const monthlyRate = totalLength * priceVariables.monthlyRatePerFoot;

  // Calculate delivery fee (using a fixed distance for now)
  const estimatedDistance = 25; // Fixed distance of 25 miles
  const deliveryFee = priceVariables.baseDeliveryFee + (estimatedDistance * priceVariables.deliveryFeePerMile);

  return {
    monthlyRate,
    installationFee,
    deliveryFee,
    totalLength,
  };
};