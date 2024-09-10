import React from 'react';
import { Customer, Quote } from '../types/common';
import DataTable, { Column } from './shared/DataTable';

interface CustomerListProps {
  customers: (Customer & { quote?: Quote })[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => Promise<void>;
  onCreateQuote: (customer: Customer) => void;
  onEditQuote: (customer: Customer, quote: Quote) => void;
  onView: (customer: Customer) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({
  customers,
  onEdit,
  onDelete,
  onCreateQuote,
  onEditQuote,
  onView,
}) => {
  const columns: Column<Customer & { quote?: Quote }>[] = [
    { label: 'Name', render: (customer) => `${customer.firstName} ${customer.lastName}` },
    { label: 'Email', render: (customer) => customer.email },
    { label: 'Phone', render: (customer) => customer.phone },
    { label: 'Address', render: (customer) => customer.address },
  ];

  const quoteAction = {
    label: 'Quote',
    action: (customer: Customer & { quote?: Quote }) => {
      if (customer.quote) {
        onEditQuote(customer, customer.quote);
      } else {
        onCreateQuote(customer);
      }
    },
    renderLabel: (customer: Customer & { quote?: Quote }) => 
      customer.quote ? 'Edit Quote' : 'Create Quote',
  };

  return (
    <DataTable 
      items={customers} 
      columns={columns} 
      onEdit={onEdit}
      onDelete={onDelete}
      onView={onView}
      additionalAction={quoteAction}
    />
  );
};

export default CustomerList;