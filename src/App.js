import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import TodoList from './pages/List/TodoList';
import EditTodo from './pages/Edit/EditTodo';
import Create from './pages/Create/CreateTodo';
import History from './pages/History/History';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list" element={<TodoList />} />
        <Route path="/edit/:id" element={<EditTodo />} />
        <Route path="/create" element={<Create />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
}

export default App;
