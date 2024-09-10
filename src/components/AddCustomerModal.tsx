import React from 'react';
import { Customer } from '../types/common';
import AddCustomerForm from './customers/AddCustomerForm';

interface AddCustomerModalProps {
  customer: Customer | null;
  isEditing: boolean;
  onCustomerAdded: () => void;
  onCancel: () => void;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
  customer,
  isEditing,
  onCustomerAdded,
  onCancel,
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <AddCustomerForm
          customer={customer}
          isEditing={isEditing}
          onCustomerAdded={onCustomerAdded}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
};

export default AddCustomerModal;