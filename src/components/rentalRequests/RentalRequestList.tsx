import React from 'react';
import { RentalRequest } from '../../types/common';
import DataTable, { Column } from '../shared/DataTable';

interface RentalRequestListProps {
  rentalRequests: RentalRequest[];
  onEdit: (request: RentalRequest) => void;
  onDelete: (id: string) => Promise<void>;
  onCreateCustomer: (request: RentalRequest) => Promise<void>;
  onView: (request: RentalRequest) => void;
}

const RentalRequestList: React.FC<RentalRequestListProps> = ({
  rentalRequests,
  onEdit,
  onDelete,
  onCreateCustomer,
  onView,
}) => {
  const columns: Column<RentalRequest>[] = [
    { label: 'Name', render: (request) => `${request.firstName} ${request.lastName}` },
    { label: 'Email', render: (request) => request.email },
    { label: 'Phone', render: (request) => request.phone },
    { label: 'Address', render: (request) => request.address },
    { label: 'Mobility Aids', render: (request) => request.mobilityAids.join(', ') },
    { label: 'Estimated Length', render: (request) => request.estimatedLength ? `${request.estimatedLength} ft` : 'None' },
    { label: 'Estimated Duration', render: (request) => request.estimatedDuration ? `${request.estimatedDuration} months` : 'None' },
    { label: 'Status', render: (request) => request.status },
  ];

  return (
    <DataTable 
      items={rentalRequests} 
      columns={columns} 
      onEdit={onEdit}
      onDelete={onDelete}
      onView={onView}
      additionalAction={{
        label: 'Create Customer',
        action: onCreateCustomer,
        showIf: (request) => !request.customerId
      }}
    />
  );
};

export default RentalRequestList;