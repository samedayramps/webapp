// src/components/Rentals.tsx
import React, { useState, useEffect } from 'react';
import { Rental } from '../types/common';
import { CrudService } from '../services/crudService';
import DataTable, { Column } from './shared/DataTable';
import { Timestamp } from 'firebase/firestore';

const rentalService = new CrudService<Rental>('rentals');

const Rentals: React.FC = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [formData, setFormData] = useState<Partial<Rental>>({
    agreementId: '',
    startDate: Timestamp.now(),
    endDate: Timestamp.now(),
    status: 'active',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    const fetchedRentals = await rentalService.getAll();
    setRentals(fetchedRentals);
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
        await rentalService.update(formData.id, formData);
      } else {
        await rentalService.create(formData as Omit<Rental, 'id' | 'createdAt' | 'updatedAt'>);
      }
      fetchRentals();
      resetForm();
    } catch (error) {
      console.error('Error adding/updating rental: ', error);
    }
  };

  const resetForm = () => {
    setFormData({ agreementId: '', startDate: Timestamp.now(), endDate: Timestamp.now(), status: 'active' });
    setIsEditing(false);
  };

  const handleEdit = (rental: Rental) => {
    setFormData(rental);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await rentalService.delete(id);
      fetchRentals();
    } catch (error) {
      console.error('Error deleting rental: ', error);
    }
  };

  const columns: Column<Rental>[] = [
    { label: 'Agreement ID', render: (rental) => rental.agreementId },
    { label: 'Start Date', render: (rental) => rental.startDate.toDate().toLocaleDateString() },
    { label: 'End Date', render: (rental) => rental.endDate.toDate().toLocaleDateString() },
    { label: 'Status', render: (rental) => rental.status },
  ];

  return (
    <div>
      <h2>Rentals</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="agreementId"
          value={formData.agreementId}
          onChange={handleInputChange}
          placeholder="Agreement ID"
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
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button type="submit">{isEditing ? 'Update Rental' : 'Add Rental'}</button>
        {isEditing && <button onClick={resetForm}>Cancel Edit</button>}
      </form>
      <h3>Rental List</h3>
      <DataTable 
        items={rentals} 
        columns={columns} 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Rentals;