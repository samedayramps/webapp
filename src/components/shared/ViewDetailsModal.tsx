import React from 'react';
import { Customer, RentalRequest, Quote } from '../../types/common';

interface ViewDetailsModalProps {
  entity: Customer | RentalRequest | Quote;
  onClose: () => void;
}

const ViewDetailsModal: React.FC<ViewDetailsModalProps> = ({ entity, onClose }) => {
  const renderDetails = () => {
    if ('firstName' in entity && 'lastName' in entity) {
      // It's a Customer or RentalRequest
      const commonDetails = (
        <>
          <p><strong>Name:</strong> {entity.firstName} {entity.lastName}</p>
          <p><strong>Email:</strong> {entity.email}</p>
          <p><strong>Phone:</strong> {entity.phone}</p>
          <p><strong>Address:</strong> {entity.address}</p>
        </>
      );

      if ('mobilityAids' in entity) {
        // It's a RentalRequest
        return (
          <>
            <h3>Rental Request Details</h3>
            {commonDetails}
            <p><strong>Mobility Aids:</strong> {entity.mobilityAids.join(', ')}</p>
            <p><strong>Estimated Length:</strong> {entity.estimatedLength || 'N/A'}</p>
            <p><strong>Estimated Duration:</strong> {entity.estimatedDuration || 'N/A'}</p>
            <p><strong>Status:</strong> {entity.status}</p>
          </>
        );
      } else {
        // It's a Customer
        return (
          <>
            <h3>Customer Details</h3>
            {commonDetails}
          </>
        );
      }
    } else {
      // It's a Quote
      return (
        <>
          <h3>Quote Details</h3>
          <p><strong>Monthly Rate:</strong> ${entity.monthlyRate.toFixed(2)}</p>
          <p><strong>Installation Fee:</strong> ${entity.installationFee.toFixed(2)}</p>
          <p><strong>Delivery Fee:</strong> ${entity.deliveryFee.toFixed(2)}</p>
          <p><strong>Total Length:</strong> {entity.totalLength} ft</p>
          <p><strong>Status:</strong> {entity.status}</p>
          <h4>Components:</h4>
          <ul>
            {Object.entries(entity.components).map(([componentId, quantity]) => (
              <li key={componentId}>{componentId}: {quantity}</li>
            ))}
          </ul>
        </>
      );
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {renderDetails()}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ViewDetailsModal;