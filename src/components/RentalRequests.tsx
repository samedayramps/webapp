import React, { useState, useEffect } from 'react';
import { RentalRequest, Customer } from '../types/common';
import { CrudService } from '../services/crudService';
import DataTable, { Column } from './shared/DataTable';

const rentalRequestService = new CrudService<RentalRequest>('rentalRequests');
const customerService = new CrudService<Customer>('customers');

const RentalRequests: React.FC = () => {
  const [rentalRequests, setRentalRequests] = useState<RentalRequest[]>([]);
  const [formData, setFormData] = useState<Partial<RentalRequest>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    mobilityAids: [],
    estimatedLength: null,
    estimatedDuration: null,
    status: 'new',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [knowLength, setKnowLength] = useState(false);
  const [knowDuration, setKnowDuration] = useState(false);

  useEffect(() => {
    fetchRentalRequests();
  }, []);

  const fetchRentalRequests = async () => {
    const fetchedRequests = await rentalRequestService.getAll();
    setRentalRequests(fetchedRequests);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleMobilityAidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      mobilityAids: checked
        ? [...(prevState.mobilityAids || []), value]
        : (prevState.mobilityAids || []).filter(aid => aid !== value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && formData.id) {
        await rentalRequestService.update(formData.id, formData);
      } else {
        await rentalRequestService.create(formData as Omit<RentalRequest, 'id' | 'createdAt' | 'updatedAt'>);
      }
      fetchRentalRequests();
      resetForm();
    } catch (error) {
      console.error('Error adding/updating rental request: ', error);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      mobilityAids: [],
      estimatedLength: null,
      estimatedDuration: null,
      status: 'new',
    });
    setIsEditing(false);
    setKnowLength(false);
    setKnowDuration(false);
  };

  const handleEdit = (request: RentalRequest) => {
    setFormData(request);
    setIsEditing(true);
    setKnowLength(request.estimatedLength !== null);
    setKnowDuration(request.estimatedDuration !== null);
  };

  const handleDelete = async (id: string) => {
    try {
      await rentalRequestService.delete(id);
      // After deleting, fetch the updated list of rental requests
      fetchRentalRequests();
    } catch (error) {
      console.error('Error deleting rental request: ', error);
    }
  };

  const handleCreateCustomer = async (request: RentalRequest) => {
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
      // After creating a customer, fetch the updated list of rental requests
      fetchRentalRequests();
    } catch (error) {
      console.error('Error creating customer: ', error);
      alert('Error creating customer. Please try again.');
    }
  };

  const columns: Column<RentalRequest>[] = [
    { label: 'Name', render: (request) => `${request.firstName} ${request.lastName}` },
    { label: 'Email', render: (request) => request.email },
    { label: 'Phone', render: (request) => request.phone },
    { label: 'Address', render: (request) => request.address },
    { label: 'Mobility Aids', render: (request) => request.mobilityAids.join(', ') },
    { label: 'Estimated Length', render: (request) => request.estimatedLength ? `${request.estimatedLength} ft` : 'None' },
    { label: 'Estimated Duration', render: (request) => request.estimatedDuration ? `${request.estimatedDuration} days` : 'None' },
    { label: 'Status', render: (request) => request.status },
  ];

  return (
    <div>
      <h2>Rental Requests</h2>
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
        <div>
          <h4>Mobility Aids</h4>
          {['wheelchair', 'scooter', 'walker', 'none'].map(aid => (
            <label key={aid}>
              <input
                type="checkbox"
                name="mobilityAids"
                value={aid}
                checked={formData.mobilityAids?.includes(aid)}
                onChange={handleMobilityAidChange}
              />
              {aid.charAt(0).toUpperCase() + aid.slice(1)}
            </label>
          ))}
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={knowLength}
              onChange={(e) => setKnowLength(e.target.checked)}
            />
            Do you know the ramp length needed?
          </label>
          {knowLength && (
            <input
              type="number"
              name="estimatedLength"
              value={formData.estimatedLength || ''}
              onChange={handleInputChange}
              placeholder="Estimated Length (ft)"
            />
          )}
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={knowDuration}
              onChange={(e) => setKnowDuration(e.target.checked)}
            />
            Do you know the duration of the rental?
          </label>
          {knowDuration && (
            <input
              type="number"
              name="estimatedDuration"
              value={formData.estimatedDuration || ''}
              onChange={handleInputChange}
              placeholder="Estimated Duration (days)"
            />
          )}
        </div>
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          required
        >
          <option value="new">New</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button type="submit">{isEditing ? 'Update Request' : 'Add Request'}</button>
        {isEditing && <button onClick={resetForm}>Cancel Edit</button>}
      </form>
      <h3>Rental Request List</h3>
      <DataTable 
        items={rentalRequests} 
        columns={columns} 
        onEdit={handleEdit}
        onDelete={handleDelete}
        additionalAction={{
          label: 'Create Customer',
          action: handleCreateCustomer,
          showIf: (request) => !request.customerId
        }}
      />
    </div>
  );
};

export default RentalRequests;