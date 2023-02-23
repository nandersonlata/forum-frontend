import LogoutIcon from '@mui/icons-material/Logout';
import { Box, createTheme, IconButton, ThemeProvider } from '@mui/material';
import Container from '@mui/material/Container';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const theme = createTheme();

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
    <ThemeProvider theme={theme}>
      <Container component="main">
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <IconButton onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
