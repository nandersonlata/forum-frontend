import LogoutIcon from '@mui/icons-material/Logout';
import { Box, createTheme, IconButton, ThemeProvider } from '@mui/material';
import Container from '@mui/material/Container';
import React from 'react';
import axios from 'axios';

export default function Home() {
  const theme = createTheme();

  function handleLogout() {
    try {
      const response = axios.post(
        'http://localhost:3001/auth/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        },
      );
      console.log(response);
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
            // flexDirection: 'column',
            // alignItems: 'center',
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
