import React from 'react';
import PriceVariables from './PriceVariables';

interface SettingsProps {
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  return (
    <div className="settings-overlay">
      <div className="settings-content">
        <h2>Settings</h2>
        <PriceVariables onClose={onClose} />
      </div>
    </div>
  );
};

export default Settings;