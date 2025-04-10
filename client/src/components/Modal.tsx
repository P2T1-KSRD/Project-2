import React from "react";

interface ModalProps {
  onAddAnother: () => void;
  onBrowse: () => void;
}

const Modal: React.FC<ModalProps> = ({ onAddAnother, onBrowse }) => {
  return (
    <div className="modal" aria-label="Restaurant Added Modal">
      <div className="modal-content" aria-labelledby="modal-title" aria-describedby="modal-description">
        <h2 id="modal-title">Restaurant Added!</h2>
        <p id="modal-description">
          Would you like to add another suggestion or browse your options?
        </p>

        <div className="modal-actions" aria-label="Modal Actions">
          <button onClick={onAddAnother} aria-label="Add Another Restaurant">
            Add Another
          </button>
          <button onClick={onBrowse} aria-label="Browse Options">
            Browse Options
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
