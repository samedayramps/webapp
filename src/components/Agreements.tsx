// src/components/Agreements.tsx
import React, { useState, useEffect } from 'react';
import { Agreement } from '../types/common';
import { CrudService } from '../services/crudService';
import DataTable, { Column } from './shared/DataTable';
import { Timestamp } from 'firebase/firestore';

const agreementService = new CrudService<Agreement>('agreements');

const Agreements: React.FC = () => {
  const [agreements, setAgreements] = useState<Agreement[]>([]);
  const [formData, setFormData] = useState<Partial<Agreement>>({
    customerId: '',
    rentalRequestId: '',
    startDate: Timestamp.now(),
    endDate: Timestamp.now(),
    status: 'pending',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchAgreements();
  }, []);

  const fetchAgreements = async () => {
    const fetchedAgreements = await agreementService.getAll();
    setAgreements(fetchedAgreements);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: Timestamp.fromDate(new Date(value)) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && formData.id) {
        await agreementService.update(formData.id, formData);
      } else {
        await agreementService.create(formData as Omit<Agreement, 'id' | 'createdAt' | 'updatedAt'>);
      }
      fetchAgreements();
      resetForm();
    } catch (error) {
      console.error('Error adding/updating agreement: ', error);
    }
  };

  const resetForm = () => {
    setFormData({ customerId: '', rentalRequestId: '', startDate: Timestamp.now(), endDate: Timestamp.now(), status: 'pending' });
    setIsEditing(false);
  };

  const handleEdit = (agreement: Agreement) => {
    setFormData(agreement);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await agreementService.delete(id);
      fetchAgreements();
    } catch (error) {
      console.error('Error deleting agreement: ', error);
    }
  };

  const columns: Column<Agreement>[] = [
    { label: 'Customer ID', render: (agreement) => agreement.customerId },
    { label: 'Request ID', render: (agreement) => agreement.rentalRequestId },
    { label: 'Start Date', render: (agreement) => agreement.startDate.toDate().toLocaleDateString() },
    { label: 'End Date', render: (agreement) => agreement.endDate.toDate().toLocaleDateString() },
    { label: 'Status', render: (agreement) => agreement.status },
  ];

  return (
    <div>
      <h2>Agreements</h2>
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
          type="date"
          name="startDate"
          value={formData.startDate?.toDate().toISOString().split('T')[0]}
          onChange={handleDateChange}
          required
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate?.toDate().toISOString().split('T')[0]}
          onChange={handleDateChange}
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          required
        >
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button type="submit">{isEditing ? 'Update Agreement' : 'Add Agreement'}</button>
        {isEditing && <button onClick={resetForm}>Cancel Edit</button>}
      </form>
      <h3>Agreement List</h3>
      <DataTable 
        items={agreements} 
        columns={columns} 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Agreements;