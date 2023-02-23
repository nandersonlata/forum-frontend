import { IconButton } from '@mui/material';
import Person2Icon from '@mui/icons-material/Person2';
import Logout from '../auth/Logout';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navigation() {
  const navigate = useNavigate();

  return (
    <Box sx={{ marginLeft: 'auto' }}>
      {window.location.pathname !== '/profile' && (
        <IconButton sx={{ mx: 3 }}>
          <Person2Icon onClick={() => navigate('/profile')} />
        </IconButton>
      )}
      <Logout />
    </Box>
  );
}
