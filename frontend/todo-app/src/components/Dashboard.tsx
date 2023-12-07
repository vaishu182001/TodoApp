import React, { useState } from 'react';
import '../css/dashboard.css';
import bar from '../images/bar.png';
import logout from '../images/turn-off.png';
import CenteredCard from './CenteredCard';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import Axios from 'axios';
import Swal from 'sweetalert2'; 
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import EditTaskModal from './EditTaskModal';
import { Navigate, useNavigate } from 'react-router-dom';
import TaskTable from './TaskTable';

/*interface Task {
  TaskName: string;
  TaskDescription: string;
  Progress: number;
}
*/
interface Task {
  Taskname: string;
  TaskDesp: string;
  progress: number;
  taskstatus: string;
  taskdate: string; 
  priority: string; // Added priority property
  taskid:number;
}
function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [taskStatusFilter, setTaskStatusFilter] = useState('All'); // Default filter is 'All'
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const username = Cookies.get('username'); // Replace 'username' with your session cookie name
    if (!username) {
      navigate('/'); // Redirect to the login page if the session cookie is not present
    }
  }, [navigate]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenEditTaskModal = (task: any) => {
    setSelectedTask(task);
    setIsEditTaskModalOpen(true);
  };

  const handleCloseEditTaskModal = () => {
    setIsEditTaskModalOpen(false);
  };

  /*const handlePinTask = (task: {
    name: string;
    description: string;
    status: string;
    date: string;
  }) => {
    console.log('Task Name:', task.name);
    console.log('Task Description:', task.description);
    console.log('Task Status:', task.status);
    console.log('Task Date:', task.date);
    // Add additional logic to handle the pinned task here
  };
  */

  //axios for adding a new task
  const handlePinTask = (task: {
    name: string;
    description: string;
    status: string;
    date: string;
    
  }) => {
    console.log('Task Name:', task.name);
    console.log('Task Description:', task.description);
    console.log('Task Status:', task.status);
    console.log('Task Date:', task.date);

    Axios.post('https://7rvvs9ngd4.execute-api.us-east-1.amazonaws.com/prod/addtask', {
      username: Cookies.get('username'),
      task,
    })
    .then((response) => {
      if (response.status === 200) {
        // Task added successfully
        Swal.fire({
          icon: 'success',
          title: 'Task Added',
          text: 'The task has been added successfully.',
        }).then(() => {
          handleCloseModal(); // Close the modal
          fetchTasks();
        });
      } else if (response.status === 409) {
        // Task with the same name already exists
        Swal.fire({
          icon: 'error',
          title: 'Task Add Error',
          text: 'A task with the same name already exists. Please choose a different name.',
        });
      } else {
        // Handle other errors
        Swal.fire({
          icon: 'error',
          title: 'Task Add Error',
          text: 'Failed to add the task. Please try again.',
        });
        console.error('Failed to add task:', response.data);
      }
    })
    .catch((error) => {
      // An error occurred while making the request
      Swal.fire({
        icon: 'error',
        title: 'Task Add Error',
        text: 'An error occurred while adding the task.Taskname already exists',
      });
      console.error('Error adding task:', error);
    });
};
  //fetching all the tasks of the logged user

  /*useEffect(() => {
    const username = Cookies.get('username');
    Axios.get(`https://7rvvs9ngd4.execute-api.us-east-1.amazonaws.com/prod/fetch-tasks?username=${username}`)
      .then((response) => {
        if (response.status === 200) {
          setTasks(response.data);
        } else {
          console.error('Failed to fetch tasks:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);
  */
  // Function to fetch and update tasks
  useEffect(() => {
    fetchTasks();
  }, [taskStatusFilter]);

  const fetchTasks = () => {
    const username = Cookies.get('username');
    Axios.get(`https://7rvvs9ngd4.execute-api.us-east-1.amazonaws.com/prod/fetch-tasks?username=${username}`)
      .then((response) => {
        if (response.status === 200) {
          const filteredTasks = response.data.filter((task: Task) => {
            if (taskStatusFilter === 'All') {
              // Exclude deleted tasks while showing on the dashboard
              return task.taskstatus !== 'Deleted';
            }
            return task.taskstatus === taskStatusFilter;
          });
          setTasks(filteredTasks);
        } else {
          console.error('Failed to fetch tasks:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  };
  
   
  const handleCheckboxChange = (taskid: number) => {
    if (selectedTasks.includes(taskid)) {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskid));
    } else {
      setSelectedTasks([...selectedTasks, taskid]);
    }
  };
  

     // assign priority tags
     /*const assignPriorityTags = (task: Task) => {
      const description = task.TaskDesp.toLowerCase();
      if (description.includes('complete') || description.includes('urgently') || description.includes('immediately')) {
        return 'High Priority';
      } else if (description.includes('finish')) {
        return 'Medium Priority';
      } else if (description.includes('do')) {
        return 'Low Priority';
      }
      return 'No Priority';
    };
    */

    // Assign priority tags based on TaskName
/*const assignPriorityTags = (task: Task) => {
  const name = task.Taskname.toLowerCase();
  if (name.includes('complete') || name.includes('urgently') || name.includes('immediately')) {
    return 'High Priority';
  } else if (name.includes('finish')) {
    return 'Medium Priority';
  } else if (name.includes('do')) {
    return 'Low Priority';
  }
  return 'No Priority';
};
*/
const assignPriorityTags = (task: Task) => {
  const name = task.Taskname.toLowerCase();
  const description = task.TaskDesp.toLowerCase();

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

  for (const keyword of highPriorityKeywords) {
    if (name.includes(keyword) || description.includes(keyword)) {
      return 'High Priority';
    }
  }

  for (const keyword of mediumPriorityKeywords) {
    if (name.includes(keyword) || description.includes(keyword)) {
      return 'Medium Priority';
    }
  }

  for (const keyword of lowPriorityKeywords) {
    if (name.includes(keyword) || description.includes(keyword)) {
      return 'Low Priority';
    }
  }

  return 'No Priority';
};


const sortTasksByPriority = () => {
  const sortedTasks = [...tasks].sort((a, b) => {
    // Use assignPriorityTags to get the priority for tasks a and b
    const priorityA = assignPriorityTags(a);
    const priorityB = assignPriorityTags(b);

    // Custom sorting function to compare priorities
    const priorityOrder = ['High Priority', 'Medium Priority', 'Low Priority','No Priority'];

    // Use the priorityOrder array to determine the sorting order
    return priorityOrder.indexOf(priorityA) - priorityOrder.indexOf(priorityB);
  });

  setTasks(sortedTasks);
};
  




  const convertVarcharToDate = (varcharDate: string) => {
    const parts = varcharDate.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0]);
      const month = parseInt(parts[1]) - 1;
      const day = parseInt(parts[2]);
      return new Date(year, month, day);
    } else {
      return null;
    }
  };

  const sortTasksByDate = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const dateA = convertVarcharToDate(a.taskdate);
      const dateB = convertVarcharToDate(b.taskdate);
  
      if (dateA && dateB) {
        return dateB.getTime() - dateA.getTime(); // Sort in descending order
      }
      return 0;
    });
  
    setTasks(sortedTasks);
  };
  
   
  //axios for deletion of each task

  const confirmDelete = (taskid: number) => {
    Swal.fire({
      title: 'Delete Task',
      text: 'Are you sure you want to delete this task?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteTask(taskid);
      }
    });
  };

  const handleDeleteTask = (taskid: number) => {
    const username = Cookies.get('username');
    Axios.delete('https://7rvvs9ngd4.execute-api.us-east-1.amazonaws.com/prod/delete-task', {data:{ taskid,username }})
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Task Deleted',
            text: 'The task has been deleted successfully.',
          }).then(() => {
            // Fetch and update the tasks after successful deletion
            fetchTasks();
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Task Delete Error',
            text: 'Failed to delete the task. Please try again.',
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Task Delete Error',
          text: 'An error occurred while deleting the task.',
        });
      });
  };



  const handleDeleteSelectedTasks = () => {
    selectedTasks.forEach((taskid) => {
      handleDeleteTask(taskid);
    });
    setSelectedTasks([]);
  };
  
  const handleDeleteAllTasks = () => {
    setSelectedTasks(tasks.map((task) => task.taskid));
    handleDeleteSelectedTasks();
  };
  //axios for removal of each task

  const confirmRemove = (taskid: number) => {
    Swal.fire({
      title: 'Remove Task',
      text: 'Are you sure you want to remove this task?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        handleRemoveTask(taskid);
      }
    });
  };

  const handleRemoveTask = (taskid: number) => {
    const username = Cookies.get('username'); 
    Axios.post('https://7rvvs9ngd4.execute-api.us-east-1.amazonaws.com/prod/remove-task', { taskid,username })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Task Removed',
            text: 'The task has been removed successfully.',
          }).then(() => {
            // Fetch and update the tasks after successful deletion
            fetchTasks();
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Task Remove Error',
            text: 'Failed to delete the task. Please try again.',
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Task Remove Error',
          text: 'An error occurred while deleting the task.',
        });
      });
  };
  const refreshDashboard = () => {
    fetchTasks(); // Call the fetchTasks function to refresh the dashboard
  };
  
  const fetchAndRefreshTasks = () => {
    fetchTasks(); // Fetch and update tasks
  };

  return (
    <>
      <Navbar onFilterChange={setTaskStatusFilter} fetchTasks={fetchTasks} fetchAndRefreshTasks={fetchAndRefreshTasks}  />
      <button className='addtaskbutton' onClick={handleOpenModal}>
        Add Task
      </button>
      <button className='sort' onClick={sortTasksByDate}>Sort by Date</button> {/* Button to trigger sorting */}
      <button className="sort" onClick={sortTasksByPriority}>
        Sort by Priority
      </button>
      <button className='delete-all-button' onClick={handleDeleteAllTasks}>
        Delete All
      </button>
      {/*
      {tasks.map((task, index) => (
     <CenteredCard
    key={index}
    taskid={task.taskid} // Pass the taskid as a prop
    taskName={task.Taskname}
    taskDescription={task.TaskDesp}
    progress={task.progress}
    taskStatus={task.taskstatus}
    taskDate={task.taskdate}
    priority={assignPriorityTags(task)} // Assign the priority tag
    onEdit={() => handleOpenEditTaskModal(task)}
    onDelete={() => confirmDelete(task.taskid)}
    onRemove={() => confirmRemove(task.taskid)}

    onCheckboxChange={() => handleCheckboxChange(task.taskid)}
    isChecked={selectedTasks.includes(task.taskid)}
    
  />
))}
      */}
   <h2>{taskStatusFilter} Tasks</h2>
<TaskTable
        tasks={tasks}
        selectedTasks={selectedTasks}
        handleCheckboxChange={handleCheckboxChange}
        handleOpenEditTaskModal={handleOpenEditTaskModal}
        confirmDelete={confirmDelete}
        confirmRemove={confirmRemove}
        assignPriorityTags={assignPriorityTags}
      />

 

      

      {isModalOpen && <Modal onClose={handleCloseModal} onPin={handlePinTask} />}
      {isEditTaskModalOpen && (
        <EditTaskModal
          task={selectedTask}
          onClose={handleCloseEditTaskModal}
          refreshDashboard={refreshDashboard} // Pass the callback function
        />
      )}
    </>
  );
}

export default Dashboard;
