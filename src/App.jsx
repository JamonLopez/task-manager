import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  console.log(tasks);

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

      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button
        onClick={() => {
          if (!title) {
            alert("Please enter a task title");
            return;
          }
          setTasks([...tasks, { title, id: Date.now() }]);
          setTitle("");
        }}
      >
        Add Task
      </button>
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
              <span>{task.title}</span>
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
