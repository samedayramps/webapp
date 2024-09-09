// src/components/Quotes.tsx
import React, { useState, useEffect } from 'react';
import { Quote, Customer, RentalRequest } from '../types/common';
import { CrudService } from '../services/crudService';
import DataTable, { Column } from './shared/DataTable';
import { writeBatch, doc } from 'firebase/firestore';
import { db } from '../firebase';  // Make sure to import your Firestore instance

const quoteService = new CrudService<Quote>('quotes');
const customerService = new CrudService<Customer>('customers');
const rentalRequestService = new CrudService<RentalRequest>('rentalRequests');

const Quotes: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [formData, setFormData] = useState<Partial<Quote>>({
    customerId: '',
    rentalRequestId: '',
    components: {},
    upfrontFee: 0,
    monthlyRate: 0,
    status: 'pending',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    const fetchedQuotes = await quoteService.getAll();
    setQuotes(fetchedQuotes);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && formData.id) {
        await quoteService.update(formData.id, formData);
      } else {
        const newQuote = await quoteService.create(formData as Omit<Quote, 'id' | 'createdAt' | 'updatedAt'>);
        
        // Update customer with the new quote ID
        if (formData.customerId) {
          await customerService.update(formData.customerId, { quoteId: newQuote });
        }

        // Update rental request with the new quote ID
        if (formData.rentalRequestId) {
          await rentalRequestService.update(formData.rentalRequestId, { quoteId: newQuote });
        }
      }
      fetchQuotes();
      resetForm();
    } catch (error) {
      console.error('Error adding/updating quote: ', error);
    }
  };

  const resetForm = () => {
    setFormData({
      customerId: '',
      rentalRequestId: '',
      components: {},
      upfrontFee: 0,
      monthlyRate: 0,
      status: 'pending'
    });
    setIsEditing(false);
  };

  const handleEdit = (quote: Quote) => {
    setFormData(quote);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const quoteToDelete = quotes.find(quote => quote.id === id);
      if (quoteToDelete) {
        const batch = writeBatch(db);

        // Delete the quote
        const quoteRef = doc(db, 'quotes', id);
        batch.delete(quoteRef);

        // Remove the quoteId from the associated customer
        if (quoteToDelete.customerId) {
          const customerRef = doc(db, 'customers', quoteToDelete.customerId);
          batch.update(customerRef, { quoteId: null });
        }

        // Remove the quoteId from the associated rental request
        if (quoteToDelete.rentalRequestId) {
          const requestRef = doc(db, 'rentalRequests', quoteToDelete.rentalRequestId);
          batch.update(requestRef, { quoteId: null });
        }

        // Commit the batch
        await batch.commit();
        console.log('Quote and related documents updated successfully');

        // Refresh the quotes list
        fetchQuotes();
      }
    } catch (error) {
      console.error('Error in batch delete operation: ', error);
    }
  };

  const columns: Column<Quote>[] = [
    { label: 'Customer ID', render: (quote) => quote.customerId },
    { label: 'Request ID', render: (quote) => quote.rentalRequestId },
    { label: 'Upfront Fee', render: (quote) => `$${quote.upfrontFee}` },
    { label: 'Monthly Rate', render: (quote) => `$${quote.monthlyRate}` },
    { label: 'Status', render: (quote) => quote.status },
  ];

  return (
    <div>
      <h2>Quotes</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="customerId"
          value={formData.customerId}
          onChange={handleInputChange}
          placeholder="Customer ID"
          required
        />
        <input
          type="text"
          name="rentalRequestId"
          value={formData.rentalRequestId}
          onChange={handleInputChange}
          placeholder="Rental Request ID"
          required
        />
        <input
          type="number"
          name="upfrontFee"
          value={formData.upfrontFee}
          onChange={handleInputChange}
          placeholder="Upfront Fee"
          required
        />
        <input
          type="number"
          name="monthlyRate"
          value={formData.monthlyRate}
          onChange={handleInputChange}
          placeholder="Monthly Rate"
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          required
        >
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
        <button type="submit">{isEditing ? 'Update Quote' : 'Add Quote'}</button>
        {isEditing && <button onClick={resetForm}>Cancel Edit</button>}
      </form>
      <h3>Quote List</h3>
      <DataTable 
        items={quotes} 
        columns={columns} 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Quotes;