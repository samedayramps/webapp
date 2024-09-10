import { Timestamp } from 'firebase/firestore';

export interface BaseEntity {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Customer extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  rentalRequestId?: string;
  quoteId?: string;
}

export interface RentalRequest extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  mobilityAids: string[];
  estimatedLength: number | null;
  estimatedDuration: number | null;
  status: string;
  customerId?: string;
  quoteId?: string;
}

export interface Quote extends BaseEntity {
  customerId: string;
  rentalRequestId: string;
  components: { [key: string]: number };
  monthlyRate: number;
  installationFee: number;
  deliveryFee: number;
  totalLength: number;
  status: string;
}

export interface Payment extends BaseEntity {
  rentalAgreementId: string;
  amount: number;
  status: string;
}

export interface Agreement extends BaseEntity {
  customerId: string;
  rentalRequestId: string;
  startDate: Timestamp;
  endDate: Timestamp;
  status: string;
}

export interface Rental extends BaseEntity {
  agreementId: string;
  startDate: Timestamp;
  endDate: Timestamp;
  status: string;
}

export interface QuoteWithCustomer extends Quote {
  customerName: string;
  customerAddress: string;
}

export interface PriceVariablesType extends BaseEntity {
  baseDeliveryFee: number;
  deliveryFeePerMile: number;
  installFeePerRampSection: number;
  installFeePerLanding: number;
  monthlyRatePerFoot: number;
  warehouseAddress: string;
}

export interface RampComponent {
  id: string;
  name: string;
  length: number;
  isLanding: boolean; // Add this line
}

export interface RampPricingCalculatorProps {
  onPriceCalculated: (monthlyRate: number, componentsObject: { [key: string]: number }, installationFee: number, deliveryFee: number, totalLength: number) => void;
  customerAddress: string;
  initialComponents: { component: RampComponent; quantity: number }[];
}