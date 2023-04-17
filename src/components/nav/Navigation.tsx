import { IconButton } from '@mui/material';
import Person2Icon from '@mui/icons-material/Person2';
import HomeIcon from '@mui/icons-material/Home';
import Logout from '../auth/Logout';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navigation() {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      {window.location.pathname !== '/profile' && (
        <IconButton sx={{ mx: 3 }} onClick={() => navigate('/profile')}>
          <Person2Icon color="primary" />
        </IconButton>
      )}
      {window.location.pathname === '/profile' && (
        <IconButton sx={{ mx: 3 }} onClick={() => navigate('/home')}>
          <HomeIcon color="primary" />
        </IconButton>
      )}
      <Logout />
    </Box>
  );
}
