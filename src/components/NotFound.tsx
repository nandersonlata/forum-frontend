import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';
import {
  Box,
  Container,
  ThemeProvider,
  useTheme,
  Typography,
} from '@mui/material';
import { isLoggedIn } from './auth/util';
import { useState } from 'react';

export function NotFound() {
  const [secondsTillRedirect, setSecondsTillRedirect] = useState<number>(5);
  setTimeout(() => {
    if (isLoggedIn()) {
      window.location.replace('/home');
    } else {
      window.location.replace('/');
    }
  }, 5000);

  setTimeout(() => {
    setSecondsTillRedirect(secondsTillRedirect - 1);
  }, 1000);

  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant={'h3'}>404 Not found</Typography>
          <Typography variant={'body1'}>
            Redirecting you in {secondsTillRedirect} seconds
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
