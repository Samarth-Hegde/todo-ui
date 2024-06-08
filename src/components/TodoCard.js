import React, { useState } from 'react';
import { Card, CardContent, Typography, Checkbox, IconButton, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import ConfirmDialog from './ConfirmDialog';

const trimText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

const TodoCard = ({ todo, onToggleCompleted, onEdit, onDelete }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = () => {
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    setConfirmOpen(false);
    onDelete(todo.id);
  };

  return (
    <>
      <Card className="flex flex-row items-center p-4 border border-gray-200 shadow-none bg-gray-100">
        <Checkbox
          icon={<RadioButtonUnchecked />}
          checkedIcon={<CheckCircleOutline />}
          checked={todo.completed}
          onChange={() => onToggleCompleted(todo.id, todo.completed)}
          className="mr-4"
        />
        <CardContent className="flex flex-col flex-grow">
          <Typography variant="h6" className={todo.completed ? 'line-through text-gray-500' : ''}>
            {trimText(todo.title, 20)}
          </Typography>
          <Typography variant="body2" color="textSecondary" className={todo.completed ? 'line-through text-gray-500' : ''}>
            {trimText(todo.description, 50)}
          </Typography>
          <Typography variant="caption" color="textSecondary" className={todo.completed ? 'line-through text-gray-500' : ''}>
            {new Date(todo.created_at).toLocaleDateString()}
          </Typography>
        </CardContent>
        <Divider orientation="vertical" flexItem className="mx-4" />
        <div className="flex items-center gap-3">
          <IconButton onClick={() => onEdit(todo.id)} disabled={todo.completed}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon className="text-red-500" />
          </IconButton>
        </div>
      </Card>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this Todo item?"
      />
    </>
  );
};

export default TodoCard;
