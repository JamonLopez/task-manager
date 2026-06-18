function TaskModal({ isOpen, onClose, onSubmit, title, setTitle, priority, setPriority, status, setStatus, taskMode }) {
  
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">
            {taskMode === "edit" ? "Edit Task" : "New Task"}
        </h2>
        <div className="modal-form">
          <label className="modal-label">
            Title
            <input
              className="modal-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title..."
              autoFocus
            />
          </label>
          <label className="modal-label">
            Priority
            <select
              className="modal-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>
          <label className="modal-label">
            Status
            <select
              className="modal-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="To Do">To Do</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </label>
        </div>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={onSubmit}>
            {taskMode === "edit" ? "Update Task" : "Add Task"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskModal