import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import React from 'react';

export default function Logout() {
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      await axios.post(
        'http://localhost:3001/auth/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
          },
        },
      );
      sessionStorage.clear();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <IconButton sx={{ marginLeft: 'auto' }} onClick={handleLogout}>
      <LogoutIcon />
    </IconButton>
  );
}
