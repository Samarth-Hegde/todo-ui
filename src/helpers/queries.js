import { useQuery,useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodos,completeTodo } from './api';

export const useFetchTodos = (sortOrder) => {
  const token = localStorage.getItem('token');

  return useQuery({
    queryKey: ['todos', sortOrder],
    queryFn: () => fetchTodos(token, sortOrder),
    keepPreviousData: true,
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
  });
};
