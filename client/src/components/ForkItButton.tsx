// ForkItButton.tsx
import React from 'react';
import "../ForkItButton.css";

interface ForkItButtonProps {
  onPick: () => void;
}

const ForkItButton: React.FC<ForkItButtonProps> = ({ onPick }) => {
  return (
    <button className="forkit-btn" onClick={onPick}>
      Fork It
    </button>
  );
};

export default ForkItButton;
