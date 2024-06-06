import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import TodoCard from '../../components/TodoCard';
import { useFetchTodos, useCompleteTodo } from '../../helpers/queries';

const TodoList = () => {
  const [sortOrder, setSortOrder] = useState('asc');
  const queryClient = useQueryClient();

  const { data: todos = [], error, isLoading } = useFetchTodos(sortOrder);
  const completeTodoMutation = useCompleteTodo();

  const handleToggleCompleted = (id, completed) => {
    completeTodoMutation.mutate(id);
  };

  const handleEdit = (id) => {
    console.log(`Edit todo ${id}`);
  };

  const handleDelete = (id) => {

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
