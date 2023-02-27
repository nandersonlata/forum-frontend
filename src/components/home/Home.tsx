import { Box, createTheme, ThemeProvider } from '@mui/material';
import Container from '@mui/material/Container';
import React from 'react';
import Navigation from '../nav/Navigation';
import CreatePost from './CreatePost';

export default function Home() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <Box
          sx={{
            marginTop: 2,
          }}
        >
          <Navigation />
          <Box>
            <CreatePost />
          </Box>
          {/*<CreatePost />*/}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
