import React, { useState } from 'react';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';

interface AddressFieldProps {
  value?: string;  // Make value optional
  onChange: (address: string) => void;
  placeholder?: string;
}

// Define libraries array outside of the component
const libraries: ("places")[] = ['places'];

const AddressField: React.FC<AddressFieldProps> = ({ value = '', onChange, placeholder = 'Enter address' }) => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
    libraries: libraries,
  });

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      const address = place.formatted_address;
      if (address) {
        onChange(address);
      }
    }
  };

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: '100%' }}
      />
    </Autocomplete>
  );
};

export default AddressField;