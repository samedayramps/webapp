import { useState, useEffect, useCallback } from 'react';
import { RentalRequest, Customer } from '../types/common';
import { CrudService } from '../services/crudService';

const rentalRequestService = new CrudService<RentalRequest>('rentalRequests');
const customerService = new CrudService<Customer>('customers');

export const useRentalRequests = () => {
  const [rentalRequests, setRentalRequests] = useState<RentalRequest[]>([]);
  const [editingRequest, setEditingRequest] = useState<RentalRequest | null>(null);

  const fetchRentalRequests = useCallback(async () => {
    const fetchedRequests = await rentalRequestService.getAll();
    setRentalRequests(fetchedRequests);
  }, []);

  useEffect(() => {
    fetchRentalRequests();
  }, [fetchRentalRequests]);

  const handleAddOrUpdateRequest = async (requestData: Partial<RentalRequest>) => {
    try {
      if (editingRequest) {
        await rentalRequestService.update(editingRequest.id, requestData);
      } else {
        await rentalRequestService.create(requestData as Omit<RentalRequest, 'id' | 'createdAt' | 'updatedAt'>);
      }
      await fetchRentalRequests();
      setEditingRequest(null);
    } catch (error) {
      console.error('Error adding/updating rental request: ', error);
    }
  };

  const handleEdit = (request: RentalRequest) => {
    setEditingRequest(request);
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await rentalRequestService.delete(id);
      await fetchRentalRequests();
    } catch (error) {
      console.error('Error deleting rental request: ', error);
    }
  };

  const handleCreateCustomer = async (request: RentalRequest): Promise<void> => {
    try {
      const customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'> = {
        firstName: request.firstName,
        lastName: request.lastName,
        email: request.email,
        phone: request.phone,
        address: request.address,
        rentalRequestId: request.id,
      };

      const newCustomerId = await customerService.create(customerData);
      await rentalRequestService.update(request.id, { customerId: newCustomerId });

      alert('Customer created successfully!');
      await fetchRentalRequests();
    } catch (error) {
      console.error('Error creating customer: ', error);
      alert('Error creating customer. Please try again.');
    }
  };

  return {
    rentalRequests,
    editingRequest,
    handleAddOrUpdateRequest,
    handleEdit,
    handleDelete,
    handleCreateCustomer,
    setEditingRequest,
    fetchRentalRequests,
  };
};