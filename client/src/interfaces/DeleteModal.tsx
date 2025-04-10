import React from 'react';

interface DeleteConfirmationModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Are you sure you want to delete this restaurant?</h2>
        <div className="modal-actions">
          <button onClick={onClose} className="modal-cancel-btn">Cancel</button>
          <button onClick={onConfirm} className="modal-confirm-btn">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
