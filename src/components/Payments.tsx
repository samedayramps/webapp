// src/components/Payments.tsx
import React, { useState, useEffect } from 'react';
import { Payment } from '../types/common';
import { CrudService } from '../services/crudService';
import DataTable, { Column } from './shared/DataTable';

const paymentService = new CrudService<Payment>('payments');

const Payments: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [formData, setFormData] = useState<Partial<Payment>>({
    rentalAgreementId: '',
    amount: 0,
    status: 'pending',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    const fetchedPayments = await paymentService.getAll();
    setPayments(fetchedPayments);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && formData.id) {
        await paymentService.update(formData.id, formData);
      } else {
        await paymentService.create(formData as Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>);
      }
      fetchPayments();
      resetForm();
    } catch (error) {
      console.error('Error adding/updating payment: ', error);
    }
  };

  const resetForm = () => {
    setFormData({ rentalAgreementId: '', amount: 0, status: 'pending' });
    setIsEditing(false);
  };

  const handleEdit = (payment: Payment) => {
    setFormData(payment);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await paymentService.delete(id);
      fetchPayments();
    } catch (error) {
      console.error('Error deleting payment: ', error);
    }
  };

  const columns: Column<Payment>[] = [
    { label: 'Agreement ID', render: (payment) => payment.rentalAgreementId },
    { label: 'Amount', render: (payment) => `$${payment.amount}` },
    { label: 'Status', render: (payment) => payment.status },
  ];

  return (
    <div>
      <h2>Payments</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="rentalAgreementId"
          value={formData.rentalAgreementId}
          onChange={handleInputChange}
          placeholder="Rental Agreement ID"
          required
        />
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          placeholder="Amount"
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          required
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
        <button type="submit">{isEditing ? 'Update Payment' : 'Add Payment'}</button>
        {isEditing && <button onClick={resetForm}>Cancel Edit</button>}
      </form>
      <h3>Payment List</h3>
      <DataTable 
        items={payments} 
        columns={columns} 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Payments;