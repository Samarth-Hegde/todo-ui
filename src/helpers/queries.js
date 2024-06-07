import { useQuery,useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodos,completeTodo, deleteTodo, updateTodo } from './api';

export const useFetchTodos = (sortOrder) => {
  const token = localStorage.getItem('token');

  return useQuery({
    queryKey: ['todos', sortOrder],
    queryFn: () => fetchTodos(token, sortOrder),
  });
};

export const useCompleteTodo = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem('token');

  return useMutation({
    mutationFn: (todo_id) => completeTodo(token, todo_id),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem('token');

  return useMutation({
    mutationFn: (todo_id) => deleteTodo(token, todo_id),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem('token');

  return useMutation({
    mutationFn: (todo_id,todo) => updateTodo(token,todo),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });
};
