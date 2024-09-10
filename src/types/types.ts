// src/components/RampPricingCalculator/types.ts
export interface RampComponent {
    id: string;
    name: string;
    length: number;
    isLanding: boolean;
  }
  
  export interface RampPricingCalculatorProps {
    onPriceCalculated: (
      monthlyRate: number,
      components: { [key: string]: number },
      installationFee: number,
      deliveryFee: number,
      totalLength: number
    ) => void;
    customerAddress: string;
    initialComponents?: { [key: string]: number };
  }
