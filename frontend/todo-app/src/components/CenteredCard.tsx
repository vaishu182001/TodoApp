import React from 'react';
import '../css/CenteredCard.css'; // Make sure to create this CSS file
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
    'study': 'menu_book', 
   
    'buy': 'shopping_cart', 
    'cleaning': 'home', 
    // You can add more mappings for other task names
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

interface CenteredCardProps {
  taskid: number; // Add taskid
  taskName: string;
  taskDescription: string;
  progress: number;
  taskStatus: string;
  taskDate:string;
  priority: string; // Add priority field

  onEdit: () => void;
  onDelete: () => void;
  onRemove: () => void;

  onCheckboxChange: () => void; // Handle checkbox change
  isChecked: boolean; // Whether the checkbox is checked

  
}

function CenteredCard({

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
  
}: CenteredCardProps) {

  const taskIcon = mapTaskNameToIcon(taskName); // Get the Material Icon for the task
  
  return (
    <div className="centered-card">
      <div className="card">
      <div className="checkbox-container">
      <input
            type="checkbox"
            checked={isChecked} // Checked state based on isChecked prop
            onChange={onCheckboxChange} // Handle checkbox change
          />
        </div>
        <h2 className="card-title"><div className="task-icon-container">
          <i className="material-icons task-icon">{taskIcon}</i>
        </div>{taskName}</h2>
        <p className="card-description">Task Des: {taskDescription}</p>
        <p className="task-id">Task ID: {taskid}</p> {/* Display the taskid */}
        <p className="task-date">Task Date: {taskDate}</p>
        
        <p className="priority-tag">Priority: {priority}</p>
        <div className="progress-container">
          <label className="progress-label">Progress:</label>
          <progress className="progress-bar" value={progress} max="100"></progress>
          <span className="progress-value">{progress}%</span>
        </div>
        <p className="task-status">Status: {taskStatus}</p>
        <div className="button-container">
        <button className="icon-button" onClick={onEdit}>
          <i className="material-icons" title="Edit Task">edit</i> {/* Edit icon */}
        </button>
        <button className="icon-button" onClick={onDelete}>
          <i className="material-icons" title="Delete Task">delete</i> {/* Delete icon */}
        </button>
        <button className="icon-button" onClick={onRemove}>
          <i className="material-icons" title="Remove Task">cancel</i> {/* Remove icon */}
        </button>
        </div>
      </div>
    </div>
  );
}

export default CenteredCard;