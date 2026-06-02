import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [taskPriority, setTaskPriority] = useState("Low");
  const [taskStatus, setTaskStatus] = useState("To Do");
  const [creatingTask, setCreatingTask] = useState(false);

  console.log(creatingTask);

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const saveTask = () => {
    if (!editingTaskId) return;
    const updateTasks = tasks.map((task) => {
      if (task.id === editingTaskId) {
        return { ...task, title: editingTitle };
      }
      return task;
    });
    setTasks(updateTasks);
    setEditingTaskId(null);
    setEditingTitle("");
  };

  return (
    <div>
      <h1>Task Manager</h1>
      
      {creatingTask ? (
        <button onClick={() => {
          setCreatingTask(false);
          setTitle("");
        }}>
          Cancel
        </button>
      ): (
        <button onClick={() => setCreatingTask(true)}>New Task</button>
      )}
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
            }}
          >
            Add Task
          </button>
          <div>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <label>
              Priority
              <select
                name="selectPriority"
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
                onChange={(e) => setTaskStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </label>
          </div>
        </>
      )}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.id === editingTaskId ? (
              <div>
                <input
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
                <button onClick={saveTask}>Save</button>
              </div>
            ) : (
              <>
              <span>{task.title}</span>
              <span> / {task.priority}</span>
              <span> / {task.status}</span>
              </>
            )}
            {task.id !== editingTaskId && (
              <>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
                <button
                  onClick={() => {
                    setEditingTaskId(task.id);
                    setEditingTitle(task.title);
                  }}
                >
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
