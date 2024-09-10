import React, { useState } from 'react';
import { Customer } from '../types/common';
import { useCustomers } from '../hooks/useCustomers';

interface CustomerSelectionModalProps {
  onSelectCustomer: (customer: Customer) => void;
  onClose: () => void;
}

const CustomerSelectionModal: React.FC<CustomerSelectionModalProps> = ({ onSelectCustomer, onClose }) => {
  const { customers } = useCustomers();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(customer => 
    `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Select a Customer</h2>
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul>
          {filteredCustomers.map(customer => (
            <li key={customer.id} onClick={() => onSelectCustomer(customer)}>
              {customer.firstName} {customer.lastName}
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default CustomerSelectionModal;