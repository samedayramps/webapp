import React from 'react';
import { Customer } from '../types/common';

interface CustomerInfoProps {
  customer: Customer;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ customer }) => {
  return (
    <div className="customer-info">
      <h3>Customer Information</h3>
      <p><strong>Name:</strong> {customer.firstName} {customer.lastName}</p>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Phone:</strong> {customer.phone}</p>
      <p><strong>Address:</strong> {customer.address}</p>
    </div>
  );
};

export default CustomerInfo;