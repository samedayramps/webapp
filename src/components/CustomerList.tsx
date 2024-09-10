import React from 'react';
import { Customer } from '../types/common';
import DataTable, { Column } from './shared/DataTable';

interface CustomerListProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => Promise<void>;
  onCreateQuote: (customer: Customer) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, onEdit, onDelete, onCreateQuote }) => {
  const columns: Column<Customer>[] = [
    { label: 'Name', render: (customer) => `${customer.firstName} ${customer.lastName}` },
    { label: 'Email', render: (customer) => customer.email },
    { label: 'Phone', render: (customer) => customer.phone },
    { label: 'Address', render: (customer) => customer.address },
  ];

  return (
    <DataTable 
      items={customers} 
      columns={columns} 
      onEdit={onEdit}
      onDelete={onDelete}
      additionalAction={{
        label: 'Create Quote',
        action: onCreateQuote,
        showIf: (customer) => !customer.quoteId
      }}
    />
  );
};

export default CustomerList;