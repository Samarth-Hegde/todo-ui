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


