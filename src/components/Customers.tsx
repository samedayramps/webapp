import React, { useState, useEffect } from 'react';
import { Customer } from '../types/common';
import { CrudService } from '../services/crudService';
import DataTable, { Column } from './shared/DataTable';
import QuoteForm from './QuoteForm';
import { writeBatch, doc } from 'firebase/firestore';
import { db } from '../firebase';  // Make sure to import your Firestore instance
import AddCustomerForm from './AddCustomerForm';

const customerService = new CrudService<Customer>('customers');

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const fetchedCustomers = await customerService.getAll();
    setCustomers(fetchedCustomers);
  };

  const handleEdit = (customer: Customer) => {
    // Implement edit functionality if needed
    console.log('Edit customer:', customer);
  };

  const handleDelete = async (id: string) => {
    try {
      const customerToDelete = customers.find(customer => customer.id === id);
      
      if (customerToDelete) {
        const batch = writeBatch(db);

        // Delete the customer
        const customerRef = doc(db, 'customers', id);
        batch.delete(customerRef);

        // If the customer has an associated rental request, update it
        if (customerToDelete.rentalRequestId) {
          const requestRef = doc(db, 'rentalRequests', customerToDelete.rentalRequestId);
          batch.update(requestRef, { customerId: null });
        }

        // Commit the batch
        await batch.commit();
        console.log('Customer and related documents updated successfully');

        // After deleting, fetch the updated list of customers
        fetchCustomers();
      }
    } catch (error) {
      console.error('Error in batch delete operation: ', error);
    }
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
    setShowAddForm(true);
  };

  const handleCustomerAdded = () => {
    setShowAddForm(false);
    fetchCustomers();
  };

  const columns: Column<Customer>[] = [
    { label: 'Name', render: (customer) => `${customer.firstName} ${customer.lastName}` },
    { label: 'Email', render: (customer) => customer.email },
    { label: 'Phone', render: (customer) => customer.phone },
    { label: 'Address', render: (customer) => customer.address },
  ];

  return (
    <div>
      <h2>Customers</h2>
      <button onClick={handleAddCustomer}>Add New Customer</button>
      
      {showAddForm && (
        <div className="modal">
          <div className="modal-content">
            <AddCustomerForm
              onCustomerAdded={handleCustomerAdded}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        </div>
      )}

      <h3>Customer List</h3>
      <DataTable 
        items={customers} 
        columns={columns} 
        onEdit={handleEdit}
        onDelete={handleDelete}
        additionalAction={{
          label: 'Create Quote',
          action: handleCreateQuote,
          showIf: (customer) => !customer.quoteId
        }}
      />
      {showQuoteForm && selectedCustomer && (
        <QuoteForm 
          customer={selectedCustomer} 
          onClose={handleQuoteFormClose}
          onQuoteCreated={fetchCustomers}
        />
      )}
    </div>
  );
};

export default Customers;