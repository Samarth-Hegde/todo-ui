import React from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  }

  return (
    <div>
        <Button variant="contained" onClick={handleLogin}>Login</Button>
        <Button variant="contained">Register</Button>
    </div>
  )
}

export default Home