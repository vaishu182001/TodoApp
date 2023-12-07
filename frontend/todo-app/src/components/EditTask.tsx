import React from 'react'
import { useState } from 'react';
import '../css/edittask.css'
const EditTask = () => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [status, setStatus] = useState('');
  
    const handleTaskNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setTaskName(e.target.value);
    };
  
    const handleTaskDescriptionChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setTaskDescription(e.target.value);
    };
  
    const handleStatusChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setStatus(e.target.value);
    };
  
    const handleEditTask = () => {
      // Implement your logic for editing the task here
      // You can use the taskName, taskDescription, and status states to update the task
      console.log(`Task Name: ${taskName}, Task Description: ${taskDescription}, Status: ${status}`);
    };
  
    return (
      <div className="task-form-container1">
        <form className="task-form1">
          <h2>Edit Task</h2>
          <div className="form-group1">
            <label htmlFor="taskName">Task Name:</label>
            <input
              type="text"
              id="taskName"
              value={taskName}
              onChange={handleTaskNameChange}
            />
          </div>
          <div className="form-group1">
            <label htmlFor="taskDescription">Task Description:</label>
            <input
              type="text"
              id="taskDescription"
              value={taskDescription}
              onChange={handleTaskDescriptionChange}
            />
          </div>
          <div className="form-group1">
            <label htmlFor="status">Status:</label>
            <input
              type="text"
              id="status"
              value={status}
              onChange={handleStatusChange}
            />
          </div>
          <button type="button" className="edit1-button" onClick={handleEditTask}>
            Edit Task
          </button>
        </form>
      </div>
    );
  };

export default EditTask