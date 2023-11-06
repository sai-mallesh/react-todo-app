import { useState, useContext } from "react";
import "./App.css";
import AddOrEditTask from "./Components/AddOrEditTask";
import { TaskContext } from "./ContextAPI/TaskProvider";
import {
  DeleteBtn,
  MarkAsCompleteBtn,
  EditBtn,
  RedoBtn,
  AddBtn,
} from "./Icons";

function App() {
  const {
    task,
    setTask,
    showAddEditTaskDialog,
    setShowAddEditTaskDialog,
    setTaskIndex,
    setEditTask,
  } = useContext(TaskContext);

  const getColor = (priority) => {
    if (priority === "High") {
      return "bg-red-500";
    } else if (priority === "Medium") {
      return "bg-yellow-500";
    } else {
      return "bg-blue-500";
    }
  };

  const [hideCompleted,setHideCompleted]=useState(false)

  const [completedTask, setCompletedTask] = useState(
    task.reduce((acc, item, index) => {
      if (item.status === "completed") {
        acc.push(index);
      }
      return acc;
    }, [])
  );

  console.log(completedTask)

  return (
    <>
      {showAddEditTaskDialog && <AddOrEditTask />}
      <div className="p-5">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center"
          onClick={() => {
            setShowAddEditTaskDialog(true);
          }}
        >
          {AddBtn}
          <span>Add Task</span>
        </button>
      </div>
      <div className="p-5 w-full">
        <table className="w-full border-collapse table-auto">
          <tbody className="bg-white divide-y divide-gray-200">
            {task &&
              task.map((taskRecord, index) => (
                <tr key={index}>
                {(hideCompleted===false || (hideCompleted===true && !completedTask.includes(index))) && (
                  <>
                  <td
                    className={`px-2 py-1 whitespace-nowrap ${getColor(
                      taskRecord.priority
                    )} w-0`}
                  />
                  <td className="px-6 py-4 whitespace-nowrap w-1/8" style={{"max-width":"80px"}}>
                  <p className="text-ellipsis overflow-hidden">{taskRecord.status !== "pending" ? (
                      <s>{taskRecord.name}</s>
                    ) : (
                      taskRecord.name
                    )}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap w-3/8" style={{"max-width":"150px"}}>
                    <p className="text-ellipsis overflow-hidden">{taskRecord.status !== "pending" ? (
                      <s>{taskRecord.desc}</s>
                    ) : (
                      taskRecord.desc
                    )}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap w-1/8">
                    {taskRecord.status !== "pending" ? (
                      <s>{taskRecord.priority}</s>
                    ) : (
                      taskRecord.priority
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap w-1/8">
                    {taskRecord.status !== "pending" ? (
                      <s>{taskRecord.dueDate}</s>
                    ) : (
                      taskRecord.dueDate
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap w-1/12">
                    <button
                      onClick={() => {
                        setShowAddEditTaskDialog(true);
                        setEditTask(true);
                        setTaskIndex(index);
                      }}
                    >
                      {EditBtn}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap w-1/12">
                    {taskRecord.status === "pending" && (
                      <button
                        onClick={() => {
                          task[index] = {
                            name: taskRecord.name,
                            desc: taskRecord.desc,
                            priority: taskRecord.priority,
                            dueDate: taskRecord.dueDate,
                            status: "completed",
                          };
                          setCompletedTask([...completedTask, index]);
                          setTask([...task]);
                        }}
                      >
                        {MarkAsCompleteBtn}
                      </button>
                    )}
                    {taskRecord.status !== "pending" && (
                      <button
                        onClick={() => {
                          task[index] = {
                            name: taskRecord.name,
                            desc: taskRecord.desc,
                            priority: taskRecord.priority,
                            dueDate: taskRecord.dueDate,
                            status: "pending",
                          };
                          setCompletedTask(
                            completedTask.filter(
                              (_, index) => !completedTask.includes(index)
                            )
                          );
                          setTask([...task]);
                        }}
                      >
                        {RedoBtn}
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap w-1/12">
                    <button
                      onClick={() => {
                        setCompletedTask(
                          completedTask.filter(
                            (_, index) => !completedTask.includes(index)
                          )
                        );
                        setTask(task.filter((_, i) => i !== index));
                      }}
                    >
                      {DeleteBtn}
                    </button>
                  </td>
                  </>)}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="p-5">
        {completedTask.length > 0 && (
          <>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold  py-2 px-4 rounded-full mr-4"
            onClick={() => {
              setTask(
                task.filter((_, index) => !completedTask.includes(index))
              );
              setCompletedTask([]);
            }}
          >
            Delete Completed Tasks
          </button>
          
          {!hideCompleted && (<button
            className="bg-yellow-300 hover:bg-yellow-500 text-white font-bold  py-2 px-4 rounded-full mr-4"
            onClick={() => {
              setHideCompleted(true)
            }}
          >
            Hide Completed Task
          </button>)}
          {hideCompleted && (<button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold  py-2 px-4 rounded-full mr-4"
            onClick={() => {
              setHideCompleted(false)
            }}
          >
            Show All Tasks
          </button>)}
          </>
        )}

        {task.length > 0 && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => {
              setTask([]);
              setCompletedTask([]);
            }}
          >
            Clear All Tasks
          </button>
        )}
      </div>
    </>
  );
}

export default App;
