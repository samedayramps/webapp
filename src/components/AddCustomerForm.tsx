import React, { useState } from 'react';
import { CrudService } from '../services/crudService';
import { Customer } from '../types/common';
import AddressField from './shared/AddressField';

interface AddCustomerFormProps {
  onCustomerAdded: () => void;
  onCancel: () => void;
}

const AddCustomerForm: React.FC<AddCustomerFormProps> = ({ onCustomerAdded, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  const customerService = new CrudService<Customer>('customers');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleAddressChange = (address: string) => {
    setFormData(prevData => ({ ...prevData, address }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await customerService.create(formData);
      alert('Customer added successfully!');
      onCustomerAdded();
    } catch (error) {
      console.error('Error adding customer:', error);
      alert('Error adding customer. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Customer</h2>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <AddressField
          value={formData.address}
          onChange={handleAddressChange}
          placeholder="Enter customer address"
        />
      </div>
      <button type="submit">Add Customer</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default AddCustomerForm;