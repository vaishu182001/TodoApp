import React from 'react';
import '../css/CenteredTable.css'; // Make sure to create this CSS file
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const mapTaskNameToIcon = (taskName: string) => {
    const iconMappings: { [key: string]: string } = {
      'read': 'menu_book',
      'write': 'article',
      'shopping': 'shopping_cart',
      'clean': 'home',
      'laundry': 'local_laundry_service',
      'workout': 'fitness_center',
      'call': 'call',
      'watch': 'local_movies',
      'cook': 'restaurant',
      'walk': 'directions_walk',
      'gym': 'fitness_center',
      'meeting': 'meeting_room',
      'water': 'local_florist',
      'bills': 'account_balance',
      'guitar': 'music_note',
      'bake': 'cake',
      'meditate': 'self_improvement',
      'learn': 'language',
      'paint': 'palette',
      'study': 'menu_book', // Example: 'study' maps to 'menu_book'
     
      'buy': 'shopping_cart', // Example: 'buy' maps to 'shopping_cart'
      'cleaning': 'home', // Example: 'cleaning' maps to 'home'
      // Add more mappings for other task names
    };
  
    const formattedTaskName = taskName.toLowerCase();
    const words = formattedTaskName.split(' ');
  
    for (const word of words) {
      if (iconMappings[word]) {
        return iconMappings[word];
      }
    }
  
    return 'assignment_turned_in'; // Default to 'assignment_turned_in' icon if no mapping found
  };

interface CenteredTableProps {
  taskid: number;
  taskName: string;
  taskDescription: string;
  progress: number;
  taskStatus: string;
  taskDate: string;
  priority: string;

  onEdit: () => void;
  onDelete: () => void;
  onRemove: () => void;

  onCheckboxChange: () => void;
  isChecked: boolean;
}

function CenteredTable({
  taskid,
  taskName,
  taskDescription,
  progress,
  taskStatus,
  taskDate,
  priority,
  onEdit,
  onDelete,
  onRemove,
  onCheckboxChange,
  isChecked,
}: CenteredTableProps) {
  const taskIcon = mapTaskNameToIcon(taskName);

  return (
    <table className="centered-table">
      <thead>
        <tr>
          <th></th> {/* Empty header for checkbox */}
          <th>Task Icon</th>
          <th>Task Name</th>
          <th>Task Description</th>
          <th>Task ID</th>
          <th>Task Date</th>
          <th>Priority</th>
          <th>Progress</th>
          <th>Status</th>
          <th>Edit</th>
          <th>Delete</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={onCheckboxChange}
            />
          </td>
          <td>
            <i className="material-icons task-icon">{taskIcon}</i>
          </td>
          <td>{taskName}</td>
          <td>Task Des: {taskDescription}</td>
          <td>Task ID: {taskid}</td>
          <td>Task Date: {taskDate}</td>
          <td>Priority: {priority}</td>
          <td>
            <div className="progress-container">
              <label className="progress-label">Progress:</label>
              <progress className="progress-bar" value={progress} max="100"></progress>
              <span className="progress-value">{progress}%</span>
            </div>
          </td>
          <td>Status: {taskStatus}</td>
          <td>
            <button className="icon-button" onClick={onEdit}>
              <i className="material-icons" title="Edit Task">edit</i>
            </button>
          </td>
          <td>
            <button className="icon-button" onClick={onDelete}>
              <i className="material-icons" title="Delete Task">delete</i>
            </button>
          </td>
          <td>
            <button className="icon-button" onClick={onRemove}>
              <i className="material-icons" title="Remove Task">cancel</i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default CenteredTable;
