import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../../nav/Navigation';
import { deactivateAccount } from '../../service';

export default function DeactivateAccount() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);

  const theme = createTheme();

  const navigate = useNavigate();
  function handleEmailChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await deactivateAccount({ email, password });

      navigate('/');
    } catch (error) {
      setErrorOccurred(true);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" sx={{ marginTop: 2 }}>
        <CssBaseline />
        <Navigation />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Deactivate Account
          </Typography>
          {errorOccurred && (
            <Typography variant="body1" sx={{ color: 'red' }}>
              An error occurred. Please try again later.
            </Typography>
          )}
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleEmailChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
            />
            <Button
              id="sign-in-button"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!email || !password}
            >
              Deactivate
            </Button>
          </Box>
          <Typography variant="body1">
            Logging in will automatically reactivate your account
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
