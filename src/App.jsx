import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [taskPriority, setTaskPriority] = useState("Low");
  const [taskStatus, setTaskStatus] = useState("To Do");
  const [creatingTask, setCreatingTask] = useState(false);
  const [editingPriority, setEditingPriority] = useState("");
  const [editingStatus, setEditingStatus] = useState("");

  console.log(creatingTask);

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
          title: editingTitle,
          priority: editingPriority,
          status: editingStatus,
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

        {creatingTask ? (
          <button
            onClick={() => {
              setCreatingTask(false);
              setTitle("");
              setTaskPriority("Low");
              setTaskStatus("To Do");
            }}
            className="btn-danger"
          >
            Cancel
          </button>
        ) : (
          <button className="btn-primary" onClick={() => setCreatingTask(true)}>
            New Task
          </button>
        )}
      </div>
      {creatingTask && (
        <>
          <button
            onClick={() => {
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
              setCreatingTask(false);
              setTaskPriority("Low");
              setTaskStatus("To Do");
            }}
            className="btn-primary"
          >
            Add Task
          </button>
          <div>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <label>
              Priority
              <select
                name="selectPriority"
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </label>
            <label>
              Status
              <select
                name="selectStatus"
                value={taskStatus}
                onChange={(e) => setTaskStatus(e.target.value)}
              >
                <option value="To Do">To Do</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </label>
          </div>
        </>
      )}
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
                  {task.id === editingTaskId ? (
                    <div>
                      <input
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                      />
                      <label>
                        Priority
                        <select
                          value={editingPriority}
                          onChange={(e) => setEditingPriority(e.target.value)}
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </label>
                      <label>
                        Status
                        <select
                          value={editingStatus}
                          onChange={(e) => setEditingStatus(e.target.value)}
                        >
                          <option value="To Do">To Do</option>
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Done">Done</option>
                        </select>
                      </label>
                      <button className="btn-primary" onClick={saveTask}>
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="task-title">{task.title}</p>
                      <div className="task-meta">
                        <span
                          className={`task-priority priority-${task.priority.toLowerCase()}`}
                        >
                          {task.priority}
                        </span>
                        <span>{task.status}</span>
                      </div>
                    </>
                  )}
                  {task.id !== editingTaskId && (
                    <div className="task-actions">
                      <button className="btn-danger" onClick={() => deleteTask(task.id)}>
                        Delete
                      </button>
                      <button
                        className="btn-secondary"
                        onClick={() => {
                          setEditingTaskId(task.id);
                          setEditingTitle(task.title);
                          setEditingPriority(task.priority);
                          setEditingStatus(task.status);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
