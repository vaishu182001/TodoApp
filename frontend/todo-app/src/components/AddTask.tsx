import React, { useState } from 'react'
import task from '../images/task.png'
import '../css/addtask.css'

function AddTask() {
    

    const [taskName, setTaskName] = useState<string>('');
    const [taskDescription, setTaskDescription] = useState<string>('');
    const [status, setStatus] = useState<string>('');
  
    const handleTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTaskName(e.target.value);
    };
  
    const handleTaskDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTaskDescription(e.target.value);
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value); // Update status state
      };
  
    const handlePinTask = () => {
      // Add your logic for pinning the task here
      // For now, let's just log the task details
      console.log(`Task Name: ${taskName}, Task Description: ${taskDescription}`);
    };
    const handleCancelTask = () => {
        // Add your logic for pinning the task here
        // For now, let's just log the task details
        console.log(`Task Name: ${taskName}, Task Description: ${taskDescription} is cancelled`);
      };
  return (
    <div className="task-form-container">
      <form className="task-form">
        <h2>Pin a Task</h2>
        <div className="form-group">
          <label htmlFor="taskName">Task Name:</label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={handleTaskNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="taskDescription">Task Description:</label>
          <input
            type="text"
            id="taskDescription"
            value={taskDescription}
            onChange={handleTaskDescriptionChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status:</label> {/* New status input field */}
          <input
            type="text"
            id="status"
            value={status}
            onChange={handleStatusChange}
            required
          />
        </div>
        
        <button type="button" className="pin-button" onClick={handlePinTask}>
          Pin Task
        </button>
        <button type="button" className="cancel-button" onClick={handleCancelTask}>
          Cancel Task
        </button>
      </form>
    </div>
  )
}

export default AddTask 