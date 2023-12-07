import React, { useState } from 'react';
import '../css/Modal.css';
import Swal from 'sweetalert2';

const Modal: React.FC<{
  onClose: () => void;
  onPin: (task: {
    name: string;
    description: string;
    status: string;
    date: string;
  }) => void;
}> = ({ onClose, onPin }) => {
  const [taskName, setTaskName] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');

  const handleInfoButtonClick = () => {
    const highPriorityKeywords = [
      'complete',
      'urgently',
      'immediately',
      'urgent',
      'critical',
      'asap',
    ];
  
    const mediumPriorityKeywords = ['finish', 'soon', 'important', 'soon'];
  
    const lowPriorityKeywords = ['do', 'casual', 'eventually', 'later'];
  
    // Create HTML content for the pop-up with the keywords
    const popupContent = `
      <strong>High Priority Keywords:</strong><br>
      ${highPriorityKeywords.join(', ')}<br><br>
      <strong>Medium Priority Keywords:</strong><br>
      ${mediumPriorityKeywords.join(', ')}<br><br>
      <strong>Low Priority Keywords:</strong><br>
      ${lowPriorityKeywords.join(', ')}
    `;
  
    // Show a pop-up message with the keyword information
    Swal.fire({
      icon: 'info',
      title: 'Task Priority Information',
      html: popupContent,
    });
  };
  


  const handlePinTask = () => {
    if (!taskName || !taskDescription) {
      // Use SweetAlert2 to display an error message
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Task Name and Task Description must be filled out',
      });
      return;
    }
    
    // Set the current date and "In Progress" status by default
    const currentDate = new Date().toISOString().split('T')[0];
    const task = {
      name: taskName,
      description: taskDescription,
      status: 'In Progress',
      date: currentDate,
    };

    console.log('Task:', task);
    onPin(task);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Pin a Task</h2>
        <button className="info-button" onClick={handleInfoButtonClick}>
          Priority Information
        </button>
        <input
          type="text"
          className="input-field"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
        <textarea
          className="description-field"
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          required
        />
       <div className="button-container">
        <button className="pin-button" onClick={handlePinTask}>
          Pin Task
        </button>
        <button className="cancel-button" onClick={onClose}>
          Cancel
        </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

