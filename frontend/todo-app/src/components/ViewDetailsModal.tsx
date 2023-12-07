// ViewDetailsModal.tsx
import React from 'react';
import '../css/ViewDetailsModal.css';

interface ViewDetailsModalProps {
  onClose: () => void;
  taskDescription: string;
  taskDate: string;
}

const ViewDetailsModal: React.FC<ViewDetailsModalProps> = ({ onClose, taskDescription, taskDate }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <span>Task Details</span>
        </div>
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className="modal-body">
          <p><strong>Description:</strong> {taskDescription}</p>
          <p><strong>Date:</strong> {taskDate}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;
