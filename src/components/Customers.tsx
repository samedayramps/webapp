import React, { useState, useEffect } from 'react';
import { Customer } from '../types/common';
import { CrudService } from '../services/crudService';
import DataTable, { Column } from './shared/DataTable';
import QuoteForm from './QuoteForm';
import { writeBatch, doc } from 'firebase/firestore';
import { db } from '../firebase';  // Make sure to import your Firestore instance

const customerService = new CrudService<Customer>('customers');

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [formData, setFormData] = useState<Partial<Customer>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    quoteId: undefined,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const fetchedCustomers = await customerService.getAll();
    setCustomers(fetchedCustomers);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && formData.id) {
        await customerService.update(formData.id, formData);
      } else {
        await customerService.create(formData as Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>);
      }
      fetchCustomers();
      resetForm();
    } catch (error) {
      console.error('Error adding/updating customer: ', error);
    }
  };

  const resetForm = () => {
    setFormData({ firstName: '', lastName: '', email: '', phone: '', address: '', quoteId: undefined });
    setIsEditing(false);
  };

  const handleEdit = (customer: Customer) => {
    setFormData(customer);
    setIsEditing(true);
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
    // After closing the quote form, fetch the updated list of customers
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Phone"
          required
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Address"
          required
        />
        <button type="submit">{isEditing ? 'Update Customer' : 'Add Customer'}</button>
        {isEditing && <button onClick={resetForm}>Cancel Edit</button>}
      </form>
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
          onQuoteCreated={fetchCustomers} // This will refresh the customer list after quote creation
        />
      )}
    </div>
  );
};

export default Customers;