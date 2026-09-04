import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import KanbanBoard from "./pages/KanbanBoard";
import Dashboard from "./pages/Dashboard";
import "./App.css";

const defaultCategories = ["Study", "Work", "Personal"];

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem("categories");

    return savedCategories
      ? JSON.parse(savedCategories)
      : defaultCategories;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  function addCategory(categoryName) {
    const cleanedName = categoryName.trim();

    const categoryExists = categories.some(
      (category) =>
        category.toLowerCase() === cleanedName.toLowerCase()
    );

    if (cleanedName && !categoryExists) {
      setCategories([...categories, cleanedName]);
      return true;
    }

    return false;
  }

  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <KanbanBoard
                tasks={tasks}
                setTasks={setTasks}
                categories={categories}
                addCategory={addCategory}
              />
            }
          />

          <Route
            path="/dashboard"
            element={
              <Dashboard
                tasks={tasks}
                categories={categories}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;