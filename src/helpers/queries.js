import { useQuery,useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodos,completeTodo, deleteTodo, updateTodo, fetchTodoById, createTodo, fetchHistory, undoHistory } from './api';

export const useFetchTodos = (sortOrder) => {
  const token = localStorage.getItem('token');

  return useQuery({
    queryKey: ['todos', sortOrder],
    queryFn: () => fetchTodos(token, sortOrder),
  });
};

export const useFetchTodoById = (todo_id) => {
  const token = localStorage.getItem('token');

  return useQuery({
    queryKey: ['todo_id'],
    queryFn: () => fetchTodoById(token, todo_id),
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
    mutationFn: ({ todo, todo_id }) => updateTodo(token,todo,todo_id),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem('token');

  return useMutation({
    mutationFn: ({ todo }) => createTodo(token,todo),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });
};

export const useFetchHistory = () => {
  const token = localStorage.getItem('token');

  return useQuery({
    queryKey: ['history'],
    queryFn: () => fetchHistory(token),
  });
};

export const useUndoHistory = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem('token');

  return useMutation({
    mutationFn: (history_id ) => undoHistory(token,history_id),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos','history']);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['todos','history']);
    },
  });
};