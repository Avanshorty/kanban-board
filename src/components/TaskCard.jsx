import persons from "../data/persons";

function TaskCard({ task, onEdit, onDelete, onMove }) {
  const responsiblePerson = persons.find(
    (person) => person.id === task.responsiblePerson
  );

  const today = new Date().toISOString().split("T")[0];

  const isOverdue =
    task.status !== "DONE" &&
    task.dueDate &&
    task.dueDate < today;

  return (
    <article className={`task-card ${isOverdue ? "overdue" : ""}`}>
      <div className="task-card-header">
        <span className="category-badge">{task.category}</span>

        {isOverdue && <span className="overdue-label">Overdue</span>}
      </div>

      <h3>{task.title}</h3>

      <p className="task-description">
        {task.description || "No description"}
      </p>

      <div className="task-information">
        <p>
          <strong>Responsible:</strong>{" "}
          {responsiblePerson
            ? responsiblePerson.name
            : "Not assigned"}
        </p>

        <p>
          <strong>Start:</strong> {task.startDate}
        </p>

        <p>
          <strong>Due:</strong> {task.dueDate}
        </p>

        {task.completeDate && (
          <p>
            <strong>Completed:</strong> {task.completeDate}
          </p>
        )}
      </div>

      <label className="move-task">
        Move to:
        <select
          value={task.status}
          onChange={(event) => onMove(task.id, event.target.value)}
        >
          <option value="TODO">TO DO</option>
          <option value="DOING">DOING</option>
          <option value="DONE">DONE</option>
        </select>
      </label>

      <div className="task-card-buttons">
        <button
          type="button"
          className="edit-button"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>

        <button
          type="button"
          className="delete-button"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskCard;