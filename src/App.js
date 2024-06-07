import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import TodoList from './pages/List/List';
import EditTodo from './pages/Edit/Edit';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list" element={<TodoList />} />
        <Route path="/edit/:id" element={<EditTodo />} />
      </Routes>
    </div>
  );
}

export default App;
