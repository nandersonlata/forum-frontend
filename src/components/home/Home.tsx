import { Box, createTheme, ThemeProvider } from '@mui/material';
import Container from '@mui/material/Container';
import React from 'react';
import Logout from '../auth/Logout';

export default function Home() {
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
          <Logout />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
