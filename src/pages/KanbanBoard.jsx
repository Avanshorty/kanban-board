import { useState } from "react";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

const columns = [
  {
    status: "TODO",
    title: "TO DO",
  },
  {
    status: "DOING",
    title: "DOING",
  },
  {
    status: "DONE",
    title: "DONE",
  },
];

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

function KanbanBoard({
  tasks,
  setTasks,
  categories,
  addCategory,
}) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  function openCreateForm() {
    setTaskToEdit(null);
    setIsFormOpen(true);
  }

  function openEditForm(task) {
    setTaskToEdit(task);
    setIsFormOpen(true);
  }

  function closeForm() {
    setTaskToEdit(null);
    setIsFormOpen(false);
  }

  function handleSaveTask(formData) {
    if (taskToEdit) {
      const updatedTasks = tasks.map((task) => {
        if (task.id !== taskToEdit.id) {
          return task;
        }

        let completeDate = task.completeDate || "";

        if (
          formData.status === "DONE" &&
          task.status !== "DONE"
        ) {
          completeDate = getTodayDate();
        }

        if (formData.status !== "DONE") {
          completeDate = "";
        }

        return {
          ...task,
          ...formData,
          completeDate,
        };
      });

      setTasks(updatedTasks);
    } else {
      const newTask = {
        ...formData,
        id: crypto.randomUUID(),
        completeDate:
          formData.status === "DONE" ? getTodayDate() : "",
      };

      setTasks([...tasks, newTask]);
    }

    closeForm();
  }

  function handleMoveTask(taskId, newStatus) {
    const updatedTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task;
      }

      return {
        ...task,
        status: newStatus,
        completeDate:
          newStatus === "DONE"
            ? task.completeDate || getTodayDate()
            : "",
      };
    });

    setTasks(updatedTasks);
  }

  function handleDeleteTask(taskId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmed) {
      const remainingTasks = tasks.filter(
        (task) => task.id !== taskId
      );

      setTasks(remainingTasks);
    }
  }

  return (
    <section className="kanban-page">
      <div className="page-heading">
        <div>
          <h2>Kanban Board</h2>
          <p>Organize and monitor your team’s tasks.</p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={openCreateForm}
        >
          + Create Task
        </button>
      </div>

      <div className="kanban-board">
        {columns.map((column) => {
          const columnTasks = tasks.filter(
            (task) => task.status === column.status
          );

          return (
            <section
              className={`kanban-column ${column.status.toLowerCase()}`}
              key={column.status}
            >
              <div className="column-heading">
                <h3>{column.title}</h3>
                <span>{columnTasks.length}</span>
              </div>

              <div className="column-tasks">
                {columnTasks.length === 0 ? (
                  <p className="empty-message">No tasks</p>
                ) : (
                  columnTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={openEditForm}
                      onDelete={handleDeleteTask}
                      onMove={handleMoveTask}
                    />
                  ))
                )}
              </div>
            </section>
          );
        })}
      </div>

      {isFormOpen && (
        <TaskForm
          key={taskToEdit ? taskToEdit.id : "new-task"}
          taskToEdit={taskToEdit}
          categories={categories}
          addCategory={addCategory}
          onSave={handleSaveTask}
          onCancel={closeForm}
        />
      )}
    </section>
  );
}

export default KanbanBoard;