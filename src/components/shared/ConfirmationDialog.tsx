// src/components/shared/ConfirmationDialog.tsx
import React from 'react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <div className="confirmation-dialog">
      <p>{message}</p>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default ConfirmationDialog;