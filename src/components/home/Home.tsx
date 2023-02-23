import { Box, createTheme, IconButton, ThemeProvider } from '@mui/material';
import Container from '@mui/material/Container';
import React from 'react';
import Logout from '../auth/Logout';
import Person2Icon from '@mui/icons-material/Person2';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const theme = createTheme();

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
          <IconButton>
            <Person2Icon onClick={() => navigate('/profile')} />
          </IconButton>
          <Logout />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
