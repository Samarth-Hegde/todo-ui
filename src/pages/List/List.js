import React, { useState } from 'react';
import TodoCard from '../../components/TodoCard';
import { useFetchTodos, useCompleteTodo, useDeleteTodo } from '../../helpers/queries';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
  const [sortOrder, setSortOrder] = useState('asc');

  const { data: todos = [], error, isLoading } = useFetchTodos(sortOrder);

  const navigate = useNavigate();

  const completeTodoMutation = useCompleteTodo();
  const deleteTodoMutation = useDeleteTodo()


  const handleToggleCompleted = (id, completed) => {
    completeTodoMutation.mutate(id);
  };

  const handleEdit = (id) => {
    navigate(`edit/${id}`)
  };

  const handleDelete = (id) => {
    deleteTodoMutation.mutate(id)
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Todo List</h1>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="asc">Sort by Created Date (Ascending)</option>
          <option value="desc">Sort by Created Date (Descending)</option>
        </select>
      </div>
      <div className="flex flex-col gap-4">
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onToggleCompleted={handleToggleCompleted}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
