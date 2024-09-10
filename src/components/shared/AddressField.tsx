import React, { useEffect, useRef, useCallback } from 'react';

interface AddressFieldProps {
  value: string;
  onChange: (address: string) => void;
  placeholder?: string;
}

const AddressField: React.FC<AddressFieldProps> = ({ value, onChange, placeholder = 'Enter address' }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const initAutocomplete = useCallback(() => {
    if (inputRef.current && window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.formatted_address) {
          onChange(place.formatted_address);
        }
      });
    }
  }, [onChange]);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = initAutocomplete;
      document.head.appendChild(script);
    };

    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      initAutocomplete();
    }
  }, [initAutocomplete]);

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ width: '100%' }}
    />
  );
};

export default AddressField;