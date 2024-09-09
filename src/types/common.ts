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
  upfrontFee: number;
  monthlyRate: number;
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