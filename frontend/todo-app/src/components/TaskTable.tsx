
// TaskTable.tsx
import React from 'react';
import '../css/TaskTable.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ViewDetailsModal from './ViewDetailsModal';
import { useState } from 'react';

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
   
  };

  const formattedTaskName = taskName.toLowerCase();
  const words = formattedTaskName.split(' ');

  for (const word of words) {
    if (iconMappings[word]) {
      return iconMappings[word];
    }
  }

  return 'assignment_turned_in'; // Default it is set to 'assignment_turned_in' icon if no mapping found
};

const mapPriorityToIcon = (priority: string) => {
    const priorityIcons: { [key: string]: string } = {
      'High Priority': 'priority_high',
      'Medium Priority': 'priority_medium',
      'Low Priority': 'priority_low',
      'No Priority': 'priority_none',
    };
  
    return priorityIcons[priority] || 'priority_none'; // Default it set  to 'priority_none' if no mapping found
  };

interface Task {
  taskid: number;
  Taskname: string;
  TaskDesp: string;
  taskdate: string;
  taskstatus: string;
  progress: number;
  priority: string; // Added priority property
}

interface TaskTableProps {
  tasks: Task[];
  selectedTasks: number[];
  handleCheckboxChange: (taskId: number) => void;
  handleOpenEditTaskModal: (task: Task) => void;
  confirmDelete: (taskId: number) => void;
  confirmRemove: (taskId: number) => void;
  assignPriorityTags: (task: Task) => string; // Added assignPriorityTags prop
}

const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  selectedTasks,
  handleOpenEditTaskModal,
  confirmDelete,
  confirmRemove,
  handleCheckboxChange,
  assignPriorityTags,
}) => {

  const [selectedTaskDetails, setSelectedTaskDetails] = useState<{ description: string; date: string } | null>(null);

  const openDetailsModal = (description: string, date: string) => {
    setSelectedTaskDetails({ description, date });
  };

  const closeDetailsModal = () => {
    setSelectedTaskDetails(null);
  };


  return (
    <div className="task-table-container">
      <table className="task-table">
        <thead>
          <tr>
            <th></th>
            <th>Task</th>
            {/*<th>Task Description</th>*/}
            {/*<th>Task ID</th>*/}
            {/*<th>Task Date</th>*/}
            <th>Priority</th>
            <th>Progress</th>
            <th>Status</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(task.taskid)}
                  checked={selectedTasks.includes(task.taskid)}
                />
              </td>
              <td className="task-name">
                  <div className="task-icons">
               <i className="material-icons" title={task.Taskname}>
                {mapTaskNameToIcon(task.Taskname)}
                </i>
                </div>
              <span>{task.Taskname}</span>
              </td>
             {/* <td>{task.TaskDesp}</td>*/}
              {/*<td>{task.taskid}</td>*/}
              {/*<td>{task.taskdate}</td>*/}
              <td>{assignPriorityTags(task)}</td>
              {/*<td>{task.progress} % </td>*/}
              <td style={{ textAlign: 'center' }}>
                <div style={{ width: '65px', height: '65px', margin: 'auto' }}>
                  <CircularProgressbar
                    value={task.progress}
                    text={`${task.progress}%`}
                    styles={buildStyles({
                      textColor: 'black',
                      pathColor: '#007BFF',
                      trailColor: '#d6d6d6',
                    })}
                  />
                </div>
              </td>
              
              <td>{task.taskstatus}</td>
              <td>
              <i
                  className="material-icons view-details-icon"
                  title="View Details"
                  onClick={() => openDetailsModal(task.TaskDesp, task.taskdate)}
                >
                  info
                </i>
              </td>
              <td>
                {/*
              <button onClick={() => handleOpenEditTaskModal(task)}>
  <i className="material-icons edit-icon" title="Edit Task">edit</i>
          </button>*/}
           <i className="material-icons edit-icon" title="Edit Task" onClick={() => handleOpenEditTaskModal(task)}>edit</i>

              </td>
              <td>
              {/*<button onClick={() => confirmDelete(task.taskid)}>
  <i className="material-icons delete-icon" title="Delete Task">delete</i>
          </button>*/}
           <i className="material-icons delete-icon" title="Delete Task" onClick={() => confirmDelete(task.taskid)}>delete</i>

              </td>
              <td>
              {/*<button onClick={() => confirmRemove(task.taskid)}>
  <i className="material-icons remove-icon" title="Remove Task">cancel</i>
</button>
          */}
           <i className="material-icons remove-icon" title="Remove Task" onClick={() => confirmRemove(task.taskid)}>cancel</i>

              </td>
               
              
        
            </tr>
          ))}
        </tbody>
      </table>
      
       {/* Details Modal */}
       
       {selectedTaskDetails && (
        <ViewDetailsModal
          onClose={closeDetailsModal}
          taskDescription={selectedTaskDetails.description}
          taskDate={selectedTaskDetails.date}
        />
      )}
       
    </div>
  );
};

export default TaskTable;
