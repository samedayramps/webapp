import React from 'react';
import { Customer } from '../types/common';

interface CustomerInfoProps {
  customer: Customer;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ customer }) => {
  return (
    <div className="customer-info" style={{
      backgroundColor: '#f0f0f0',
      padding: '15px',
      borderRadius: '5px',
      marginBottom: '20px'
    }}>
      <h3>Customer Information</h3>
      <p><strong>Name:</strong> {customer.firstName} {customer.lastName}</p>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Phone:</strong> {customer.phone}</p>
      <p><strong>Address:</strong> {customer.address}</p>
      {customer.rentalRequestId && (
        <p><strong>Rental Request ID:</strong> {customer.rentalRequestId}</p>
      )}
    </div>
  );
};

export default CustomerInfo;