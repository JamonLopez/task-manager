import { useState } from "react";
import "./App.css";
import TaskModal from "./components/TaskModal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [taskPriority, setTaskPriority] = useState("Low");
  const [taskStatus, setTaskStatus] = useState("To Do");
  const [creatingTask, setCreatingTask] = useState(false);
  const [taskMode, setTaskMode] = useState("create");

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const saveTask = () => {
    if (!editingTaskId) return;
    const updateTasks = tasks.map((task) => {
      if (task.id === editingTaskId) {
        return {
          ...task,
          title: title,
          priority: taskPriority,
          status: taskStatus,
        };
      }
      return task;
    });
    setTasks(updateTasks);
    setEditingTaskId(null);
    setEditingTitle("");
    setEditingPriority("");
    setEditingStatus("");
  };

  const columns = [
    { title: "To Do", status: "To Do" },
    { title: "Pending", status: "Pending" },
    { title: "In Progress", status: "In Progress" },
    { title: "Done", status: "Done" },
  ];

  return (
    <div className="app">
      <div className="app-header">
        <h1>Task Manager</h1>
        <button className="btn-primary" onClick={() => setCreatingTask(true)}>
          New Task
        </button>
      </div>
      <TaskModal
        isOpen={creatingTask}
        taskMode={taskMode}
        title={title}
        setTitle={setTitle}
        priority={taskPriority}
        setPriority={setTaskPriority}
        status={taskStatus}
        setStatus={setTaskStatus}
        onClose={() => {
          setCreatingTask(false);
          setTitle("");
          setTaskPriority("Low");
          setTaskStatus("To Do");
          setTaskMode("create");
        }}
        onSubmit={() => {
          if (taskMode === "edit") {
            saveTask();
          } else {
            if (!title) {
              alert("Please enter a task title");
              return;
            }
            const newTask = {
              title,
              id: Date.now(),
              priority: taskPriority,
              status: taskStatus,
            };
            setTasks([...tasks, newTask]);
            setTitle("");
            setTaskPriority("Low");
            setTaskStatus("To Do");
          }
          setCreatingTask(false);
          setTaskMode("create");
        }}
      />
      <div className="kanban-board">
        {" "}
        {/*Contenedor kanban*/}
        {columns.map((column) => (
          <div key={column.status} className="kanban-column">
            <h2 className="column-header">{column.title}</h2>
            {tasks
              .filter((task) => task.status === column.status)
              .map((task) => (
                <div key={task.id} className="task-card">
                  <div className="task-meta">
                    <span className="task-title">{task.title}</span>
                    <span
                      className={`task-priority priority-${task.priority.toLowerCase()}`}
                    >
                      {task.priority}
                    </span>
                  </div>
                  <div className="task-actions">
                    <button
                      className="btn-danger"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn-secondary"
                      onClick={() => {
                        setTaskMode("edit");
                        setEditingTaskId(task.id);
                        setTitle(task.title);
                        setTaskPriority(task.priority);
                        setTaskStatus(task.status);
                        setCreatingTask(true);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
