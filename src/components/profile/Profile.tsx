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
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../nav/Navigation';
import { getCurrentUser } from './service';
import { GetUserResponse } from './types';
import { useEffect, useState } from 'react';

export default function Profile() {
  const theme = createTheme();
  const [loggedInUser, setLoggedInUser] = useState<GetUserResponse>({
    id: 0,
    displayName: '',
  });
  const url = useLocation();
  console.log(loggedInUser);
  console.log(url);

  useEffect(() => {
    getCurrentUser().then((user) => setLoggedInUser(user));
  });

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
          {loggedInUser.displayName.length > 0 &&
            url.pathname.endsWith(loggedInUser.displayName) && (
              <Box aria-label={'profile-settings'}>
                <Typography component="h1" variant="h5">
                  Update Profile Settings
                </Typography>
                <Link
                  to="/profile/deactivate"
                  style={{ textDecoration: 'none' }}
                >
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
            )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
