import React from 'react';
import { useUndoHistory, useFetchHistory } from '../../helpers/queries';
import { Button, Card, CardContent, Typography, Divider } from '@mui/material';

const TodoHistory = () => {
  const { data: history = [], error, isLoading } = useFetchHistory();
  const undoMutation = useUndoHistory();

  const handleUndo = (id) => {
    undoMutation.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todo History</h1>
      <div className="flex flex-col gap-4">
        {history.map((item) => (
          <Card key={item.id} className="flex flex-row items-center p-4 border border-gray-200 shadow-none bg-gray-100">
            <CardContent className="flex flex-col flex-grow">
              <Typography variant="body1">
                Action: {item.action}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Todo Title: {item.todo_title}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {new Date(item.created_at).toLocaleString()}
              </Typography>
            </CardContent>
            <Divider orientation="vertical" flexItem className="mx-4" />
            <Button variant="contained" color="primary" onClick={() => handleUndo(item.id)}>
              Undo
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TodoHistory;
