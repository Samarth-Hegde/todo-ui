import React from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  }

  const handleRegister = () => {
    navigate('/register');
  }

  return (
    <div>
        <Button variant="contained" onClick={handleLogin}>Login</Button>
        <Button variant="contained" onClick={handleRegister}>Register</Button>
    </div>
  )
}

export default Home