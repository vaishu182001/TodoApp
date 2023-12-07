import React, { useState } from 'react';

interface FormData {
  taskName: string;
  taskDescription: string;
  isPinned: boolean;
}

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [isPinned, setIsPinned] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can handle form submission here and pass the data to the parent component.
    onSubmit({ taskName, taskDescription, isPinned });
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Task</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>Task Name:</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Task Description:</label>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              rows={4}
              required
            />
          </div>
          <div className="form-group">
            <label>Pin Task:</label>
            <input
              type="checkbox"
              checked={isPinned}
              onChange={() => setIsPinned(!isPinned)}
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;
