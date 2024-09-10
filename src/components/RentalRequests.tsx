import React, { useState } from 'react';
import RentalRequestList from './RentalRequestList';
import { useRentalRequests } from '../hooks/useRentalRequests';
import RentalRequestFormModal from './RentalRequestFormModal';
import ViewDetailsModal from './shared/ViewDetailsModal';
import { RentalRequest } from '../types/common'; // Add this import

const RentalRequests: React.FC = () => {
  const {
    rentalRequests,
    handleAddOrUpdateRequest,
    handleDelete,
    handleCreateCustomer,
    fetchRentalRequests,
  } = useRentalRequests();

  const [selectedRequest, setSelectedRequest] = useState<RentalRequest | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (request: RentalRequest) => {
    setSelectedRequest(request);
    setIsEditing(true);
    setShowAddForm(true);
  };

  const handleAddRequest = () => {
    setSelectedRequest(null);
    setIsEditing(false);
    setShowAddForm(true);
  };

  const handleRequestAdded = () => {
    setShowAddForm(false);
    fetchRentalRequests();
  };

  const handleView = (request: RentalRequest) => {
    setSelectedRequest(request);
    setShowViewDetails(true);
  };

  return (
    <div>
      <h2>Rental Requests</h2>
      <button onClick={handleAddRequest}>Add New Rental Request</button>
      
      {showAddForm && (
        <RentalRequestFormModal
          request={selectedRequest}
          isEditing={isEditing}
          onRequestAdded={handleRequestAdded}
          onCancel={() => setShowAddForm(false)}
          onSubmit={handleAddOrUpdateRequest}
        />
      )}

      <h3>Rental Request List</h3>
      <RentalRequestList
        rentalRequests={rentalRequests}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreateCustomer={handleCreateCustomer}
        onView={handleView}
      />
      {showViewDetails && selectedRequest && (
        <ViewDetailsModal
          entity={selectedRequest}
          onClose={() => setShowViewDetails(false)}
        />
      )}
    </div>
  );
};

export default RentalRequests;