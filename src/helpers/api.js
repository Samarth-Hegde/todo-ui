const baseUrl = process.env.REACT_APP_TODO_API_URL;

export const fetchTodos = async (token, sortOrder) => {
  const response = await fetch(`${baseUrl}/todos/`, {
    headers: {
      'Authorization': `Token ${token}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });
};

export const fetchTodoById = async (token,todo_id) => {
  const response = await fetch(`${baseUrl}/todos/${todo_id}/`, {
    headers: {
      'Authorization': `Token ${token}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data
}

export const completeTodo = async (token, todo_id) => {
  const response = await fetch(`${baseUrl}/todos/${todo_id}/complete/`, {
    method: "POST",
    headers: {
      'Authorization': `Token ${token}`,
      'Accept': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data
};

export const deleteTodo = async (token, todo_id) => {
  const response = await fetch(`${baseUrl}/todos/${todo_id}/`, {
    method: "DELETE",
    headers: {
      'Authorization': `Token ${token}`,
      'Accept': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data
};

export const updateTodo = async (token,todo,todo_id) => {
  const body = JSON.stringify(todo); 
  const response = await fetch(`${baseUrl}/todos/${todo_id}/`, {
    method: "PUT",
    headers: {
      'Authorization': `Token ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: body
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data
};

export const createTodo = async (token,todo) => {
  const body = JSON.stringify(todo); 
  const response = await fetch(`${baseUrl}/todos/`, {
    method: "POST",
    headers: {
      'Authorization': `Token ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: body
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data
};
