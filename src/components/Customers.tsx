import React, { useState } from 'react';
import { Customer, Quote } from '../types/common'; // Add Quote to the import
import CustomerList from './customers/CustomerList';
import { useCustomers } from '../hooks/useCustomers';
import AddCustomerModal from './AddCustomerModal';
import QuoteFormModal from './quotes/QuoteFormModal';
import ViewDetailsModal from './shared/ViewDetailsModal';  // Add this line
import { useQuotes } from '../hooks/useQuotes';  // Add this import

// Update the Customer type to include the quote property
type CustomerWithQuote = Customer & { quote?: Quote };

const Customers: React.FC = () => {
  const { customers, fetchCustomers, handleDelete } = useCustomers();
  const { handleAddOrUpdateQuote } = useQuotes();  // Add this line
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerWithQuote | null>(null);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showViewDetails, setShowViewDetails] = useState(false);  // Add this line
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

  const handleView = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowViewDetails(true);
  };

  const handleQuoteCreated = async (quoteData: any) => {
    await handleAddOrUpdateQuote(quoteData);
    handleQuoteFormClose();
  };

  const handleEditQuote = (customer: Customer & { quote?: Quote }) => {
    setSelectedCustomer(customer);
    setShowQuoteForm(true);
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
        onEditQuote={handleEditQuote}
        onView={handleView}  // Add this line
      />
      {showQuoteForm && selectedCustomer && (
        <QuoteFormModal
          quote={selectedCustomer.quote}
          customer={selectedCustomer}
          onClose={handleQuoteFormClose}
          onQuoteCreated={handleQuoteCreated}
        />
      )}
      {showViewDetails && selectedCustomer && (
        <ViewDetailsModal
          entity={selectedCustomer}
          onClose={() => setShowViewDetails(false)}
        />
      )}
    </div>
  );
};

export default Customers;