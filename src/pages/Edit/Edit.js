import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useUpdateTodo } from '../../helpers/queries';

const EditTodo = () => {
    const { id } = useParams();
    const { control, handleSubmit, setValue } = useForm();
    const editMutation = useUpdateTodo()

    const onSubmit = (data) => {
    editMutation.mutate(data)
    };

    return (
        <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Edit Todo</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field }) => (
                <TextField
                {...field}
                label="Title"
                variant="outlined"
                fullWidth
                className="mb-4"
                />
            )}
            />
            <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
                <TextField
                {...field}
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                />
            )}
            />
            <Button type="submit" variant="contained" className='!bg-green-400'>
            Save
            </Button>
        </form>
        </div>
    );
};

export default EditTodo;
