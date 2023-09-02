import "./App.css";
import { TodoForm } from "./components/TodoForm/TodoForm";
import { TodoWrapper } from "./components/TodoWrapper/TodoWrapper";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import uuid from "react-uuid";
function App() {
  const [tasks, setTasks] = useState([]);
  const addTask = async (task, desc, dateValue) => {
    setTasks([
      ...tasks,
      {
        id: uuid(),
        todo: task,
        desc: desc,
        dateValue: dateValue,
      },
    ]);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<TodoWrapper tasks={tasks} setTasks={setTasks} />}
        />
        <Route path="/todoform" element={<TodoForm addTask={addTask} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
