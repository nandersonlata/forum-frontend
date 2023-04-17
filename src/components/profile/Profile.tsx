import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../nav/Navigation';

export default function Profile() {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" sx={{ marginTop: 2 }}>
        <CssBaseline />
        <Navigation />
        <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Update Profile Settings
          </Typography>
          <Link to="/profile/deactivate" style={{ textDecoration: 'none' }}>
            <Button
              id="sign-in-button"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Deactivate Account
            </Button>
          </Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
