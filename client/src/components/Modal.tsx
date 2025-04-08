import React from "react";

interface ModalProps {
    onAddAnother: () => void;
    onBrowse: () => void;
}

const Modal: React.FC<ModalProps> = ({ onAddAnother, onBrowse }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Restaurant Added!</h2>
                <p>Would you like to add another suggestion or browse your options?</p>

            <div className="modal-actions">
                <button onClick={onAddAnother}>Add Another</button>
                <button onClick={onBrowse}>Browse Options</button>
            </div>
            </div>
        </div>
    );
};

export default Modal;