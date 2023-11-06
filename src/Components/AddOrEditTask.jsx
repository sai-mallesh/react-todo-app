import { useContext, useState,Fragment } from "react";
import { TaskContext } from "../ContextAPI/TaskProvider";
import { Dialog, Transition } from '@headlessui/react'

const AddOrEditTask = () => {
  const {
    task,
    setTask,
    setShowAddEditTaskDialog,
    showAddEditTaskDialog,
    taskIndex,
    setTaskIndex,
    editTask,
    setEditTask,
  } = useContext(TaskContext);

  const [newTask, setNewTask] = useState({
    name: editTask ? task[taskIndex].name : "",
    desc: editTask ? task[taskIndex].desc : "",
    priority: editTask ? task[taskIndex].priority : "Low",
    dueDate: editTask ? task[taskIndex].dueDate : "",
    status: editTask ? task[taskIndex].status : "pending"
  });

  const handleClose = () => {
    setShowAddEditTaskDialog(false);
  };

  const handleSave = () => {
    if (editTask) {
      task[taskIndex] = {
        name: newTask.name,
        desc: newTask.desc,
        priority: newTask.priority,
        dueDate: newTask.dueDate,
        status:newTask.status
      };
      setEditTask(false);
      setTaskIndex(null);
      setShowAddEditTaskDialog(false);
      return;
    }

    setTask([
      ...task,
      {
        name: newTask.name,
        desc: newTask.desc,
        priority: newTask.priority,
        dueDate: newTask.dueDate,
        status:newTask.status
      },
    ]);
    setNewTask({ ...newTask, name: "", desc: "" });
    setShowAddEditTaskDialog(false);
  };
  return (
    <>
     <Transition.Root show={showAddEditTaskDialog} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
      <div className="p-10">
        <div className="mt-2">
          <label>Task</label>
          <input
            className="p-2 border-slate-300 w-full border-2"
            type="text"
            placeholder="Enter Task Name"
            value={newTask.name}
            onChange={(event) => {
              setNewTask({ ...newTask, name: event.target.value });
            }}
          />
        </div>
        <div className="mt-4">
          <label>Task Description</label>
          <textarea
            className="p-2 border-slate-300 w-full border-2"
            value={newTask.desc}
            onChange={(event) => {
              setNewTask({ ...newTask, desc: event.target.value });
            }}
          />
        </div>
        <div className="mt-4">
          <label>Priority</label>
          <select
            className="p-2 border-slate-300 w-full border-2"
            value={newTask.priority}
            onChange={(event) => {
              setNewTask({ ...newTask, priority: event.target.value });
            }}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="mt-4">
          <label>Date</label>
          <input
            className="p-2 border-slate-300 w-full border-2"
            type="date"
            placeholder="Due Date"
            value={newTask.dueDate}
            onChange={(event) => {
              setNewTask({ ...newTask, dueDate: event.target.value });
            }}
          />
        </div>
        <div className="mt-4">
          <center>
            <button
              className="w-1/3 mr-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleSave}
            >
              Save
            </button>
            <button className="w-1/3 bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleClose}>
              Cancel
            </button>
          </center>
        </div>
      </div>
      </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </>
  );
};

export default AddOrEditTask;
