import React from 'react';
import { RentalRequest } from '../../types/common';
import RentalRequestForm from './RentalRequestForm';

interface RentalRequestFormModalProps {
  request: RentalRequest | null;
  isEditing: boolean;
  onRequestAdded: () => void;
  onCancel: () => void;
  onSubmit: (data: Partial<RentalRequest>) => Promise<void>;
}

const RentalRequestFormModal: React.FC<RentalRequestFormModalProps> = ({
  request,
  isEditing,
  onRequestAdded,
  onCancel,
  onSubmit,
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <RentalRequestForm
          initialData={request || undefined}
          onSubmit={async (data: Partial<RentalRequest>) => {
            await onSubmit(data);
            onRequestAdded();
          }}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
};

export default RentalRequestFormModal;