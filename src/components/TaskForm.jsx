import { useState } from "react";
import persons from "../data/persons";

const emptyTask = {
  title: "",
  description: "",
  category: "",
  startDate: "",
  dueDate: "",
  responsiblePerson: "",
  status: "TODO",
};

function TaskForm({
  taskToEdit,
  categories,
  addCategory,
  onSave,
  onCancel,
}) {
  const [formData, setFormData] = useState(
    taskToEdit ? { ...taskToEdit } : emptyTask
  );

  const [newCategory, setNewCategory] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleAddCategory() {
    const added = addCategory(newCategory);

    if (added) {
      setFormData({
        ...formData,
        category: newCategory.trim(),
      });

      setNewCategory("");
    } else {
      alert("Enter a new and unique category.");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.category ||
      !formData.responsiblePerson ||
      !formData.startDate ||
      !formData.dueDate
    ) {
      alert("Please complete all required fields.");
      return;
    }

    if (formData.dueDate < formData.startDate) {
      alert("Due date cannot be earlier than start date.");
      return;
    }

    onSave(formData);
  }

  return (
    <div className="modal-overlay">
      <div className="task-form-container">
        <h2>{taskToEdit ? "Edit Task" : "Create New Task"}</h2>

        <form onSubmit={handleSubmit} className="task-form">
          <label>
            Title *
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description"
              rows="3"
            />
          </label>

          <label>
            Category *
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <div className="new-category-row">
            <input
              type="text"
              value={newCategory}
              onChange={(event) => setNewCategory(event.target.value)}
              placeholder="Add new category"
            />

            <button
              type="button"
              className="secondary-button"
              onClick={handleAddCategory}
            >
              Add Category
            </button>
          </div>

          <div className="form-row">
            <label>
              Start Date *
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </label>

            <label>
              Due Date *
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </label>
          </div>

          <label>
            Responsible Person *
            <select
              name="responsiblePerson"
              value={formData.responsiblePerson}
              onChange={handleChange}
            >
              <option value="">Select a person</option>

              {persons.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Status
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="TODO">TO DO</option>
              <option value="DOING">DOING</option>
              <option value="DONE">DONE</option>
            </select>
          </label>

          <div className="form-buttons">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>

            <button type="submit" className="primary-button">
              {taskToEdit ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;