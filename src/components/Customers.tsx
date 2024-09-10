import React, { useState } from 'react';
import { Customer } from '../types/common';
import CustomerList from './CustomerList';
import { useCustomers } from '../hooks/useCustomers';
import AddCustomerModal from './AddCustomerModal';
import QuoteFormModal from './QuoteFormModal';

const Customers: React.FC = () => {
  const { customers, fetchCustomers, handleDelete } = useCustomers();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsEditing(true);
    setShowAddForm(true);
  };

  const handleCreateQuote = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowQuoteForm(true);
  };

  const handleQuoteFormClose = () => {
    setShowQuoteForm(false);
    setSelectedCustomer(null);
    fetchCustomers();
  };

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setIsEditing(false);
    setShowAddForm(true);
  };

  const handleCustomerAdded = () => {
    setShowAddForm(false);
    fetchCustomers();
  };

  return (
    <div>
      <h2>Customers</h2>
      <button onClick={handleAddCustomer}>Add New Customer</button>
      
      {showAddForm && (
        <AddCustomerModal
          customer={selectedCustomer}
          isEditing={isEditing}
          onCustomerAdded={handleCustomerAdded}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <h3>Customer List</h3>
      <CustomerList 
        customers={customers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreateQuote={handleCreateQuote}
      />
      {showQuoteForm && selectedCustomer && (
        <QuoteFormModal
          customer={selectedCustomer}
          onClose={handleQuoteFormClose}
          onQuoteCreated={fetchCustomers}
        />
      )}
    </div>
  );
};

export default Customers;