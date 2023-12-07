import React, { useState } from 'react';
import '../css/edittaskmodal.css';
import  Axios  from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
interface EditTaskModalProps {
  task: {
    taskid: number;
    Taskname: string;
    TaskDesp: string;
    progress: number;
    taskstatus: string;
  };
  onClose: () => void;
  refreshDashboard: () => void;
}

function EditTaskModal({ task, onClose,refreshDashboard }: EditTaskModalProps) {
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleEdit = () => {
    // Prepare data to be sent in the POST request
    const data = {
      username: Cookies.get('username'),
      taskid: editedTask.taskid, // Include taskid in the data
      taskName: editedTask.Taskname,
      taskDesp: editedTask.TaskDesp,
      progress: editedTask.progress,
      taskstatus: editedTask.taskstatus,
    };

    // Send a POST request using Axios
    Axios.post('https://7rvvs9ngd4.execute-api.us-east-1.amazonaws.com/prod/edit-task', data)
      .then((response) => {
        if (response.status === 200) {
          // Task was successfully edited
          Swal.fire({
            icon: 'success',
            title: 'Task Edited',
            text: 'The task has been edited successfully.',
          }).then(() => {
            // After a successful edit, close the modal
            onClose();
            refreshDashboard();
          });

        } else {
          // Handle other response statuses or errors as needed
          Swal.fire({
            icon: 'error',
            title: 'Task Edit Error',
            text: 'Failed to edit the task. Please try again.',
          });
        }
      })
      .catch((error) => {
        // Handle any errors from the POST request
        Swal.fire({
          icon: 'error',
          title: 'Task Edit Error',
          text: 'An error occurred while editing the task.',
        });
      });
      onClose();
  };

  return (
    <div className="edit-task-modal">
      <div className="edit-task-modal-content">
        <span className="edit-close" onClick={onClose}>
          &times;
        </span>
        <h2 className="edit-heading">Edit Task</h2>
        <input
          type="text"
          className="edit-input-field"
          placeholder="Task ID"
          value={editedTask.taskid} // Display taskid
          disabled // Disable the taskid input field
        />
        <input
          type="text"
          className="edit-input-field"
          placeholder="Task Name"
          value={editedTask.Taskname}
          onChange={(e) => setEditedTask({ ...editedTask, Taskname: e.target.value })}
          disabled
          required
        />
        <textarea
          className="edit-input-field"
          placeholder="Task Description"
          value={editedTask.TaskDesp}
          onChange={(e) => setEditedTask({ ...editedTask, TaskDesp: e.target.value })}
          
          required
        />
        <div className="edit-progress-container">
          <label className="edit-progress-label">Progress:</label>
          <input
            type="number"
            className="edit-progress-field"
            value={editedTask.progress}
            onChange={(e) => {
                let value = Number(e.target.value);
                // Ensure the value is lying between 0 and 100
                if (value < 0) {
                  value = 0;
                } else if (value > 100) {
                  value = 100;
                }
                setEditedTask({ ...editedTask, progress: value });
              }}
          />
        </div>
        
        <div className="edit-status-container">
          <label className="edit-status-label">Status:</label>
          <select
            className="edit-input-field"
            value={editedTask.taskstatus}
            onChange={(e) => setEditedTask({ ...editedTask, taskstatus: e.target.value })}
          >
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
           
          </select>
        </div>
        <button className="edit-submit-button" onClick={handleEdit}>
          Edit Task
        </button>
        <button className="edit-cancel-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditTaskModal;
