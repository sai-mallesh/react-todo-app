import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

const TaskProvider = ({children}) => {

    const [task, setTask] = useState([]);
    const [completedTask, setCompletedTask] = useState([]);
    const [showAddEditTaskDialog,setShowAddEditTaskDialog]=useState(false);
    const [taskIndex,setTaskIndex]=useState(null);
    const [editTask,setEditTask]=useState(false);

  return (
    <TaskContext.Provider value={{ task, setTask,completedTask, setCompletedTask, showAddEditTaskDialog,setShowAddEditTaskDialog,taskIndex,setTaskIndex,editTask,setEditTask }}>
        {children}
      </TaskContext.Provider>
  )
}

export default TaskProvider