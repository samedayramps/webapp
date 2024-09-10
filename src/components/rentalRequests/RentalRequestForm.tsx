import React, { useState } from 'react';
import { RentalRequest } from '../../types/common';
import AddressField from '../shared/AddressField';
import FormInput from '../shared/FormInput';

interface RentalRequestFormProps {
  initialData?: Partial<RentalRequest>;
  onSubmit: (data: Partial<RentalRequest>) => void;
  onCancel?: () => void;
}

const RentalRequestForm: React.FC<RentalRequestFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Partial<RentalRequest>>(initialData || {
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
  const [knowLength, setKnowLength] = useState(initialData?.estimatedLength !== null);
  const [knowDuration, setKnowDuration] = useState(initialData?.estimatedDuration !== null);

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

  const handleAddressChange = (address: string) => {
    setFormData(prevState => ({ ...prevState, address }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requestData = {
      ...formData,
      estimatedLength: knowLength ? Number(formData.estimatedLength) : null,
      estimatedDuration: knowDuration ? Number(formData.estimatedDuration) : null,
    };
    onSubmit(requestData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        label="First Name"
        name="firstName"
        value={formData.firstName || ''}
        onChange={handleInputChange}
        required
      />
      <FormInput
        label="Last Name"
        name="lastName"
        value={formData.lastName || ''}
        onChange={handleInputChange}
        required
      />
      <FormInput
        label="Email"
        name="email"
        type="email"
        value={formData.email || ''}
        onChange={handleInputChange}
        required
      />
      <FormInput
        label="Phone"
        name="phone"
        type="tel"
        value={formData.phone || ''}
        onChange={handleInputChange}
        required
      />
      <AddressField
        value={formData.address || ''}
        onChange={handleAddressChange}
        placeholder="Address"
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
          <FormInput
            label="Estimated Length (ft)"
            name="estimatedLength"
            type="number"
            value={formData.estimatedLength || ''}
            onChange={handleInputChange}
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
          <FormInput
            label="Estimated Duration (months)"
            name="estimatedDuration"
            type="number"
            value={formData.estimatedDuration || ''}
            onChange={handleInputChange}
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
      <button type="submit">{initialData ? 'Update Request' : 'Add Request'}</button>
      {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
};

export default RentalRequestForm;