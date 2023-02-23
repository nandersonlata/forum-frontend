import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { addTokensFromResponseToSessionStorage } from './util';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [validSignup, setValidSignup] = useState<boolean>(false);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    validatePasswords();
  });

  function handleEmailChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setPassword(event.target.value);
  }

  function handlePasswordConfirmationChange(
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    setPasswordConfirmation(event.target.value);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/signup', {
        email,
        password,
      });

      addTokensFromResponseToSessionStorage(response);
      navigate('/');
      setValidSignup(false);
    } catch (error) {
      setValidSignup(true);
    }
  };

  function validatePasswords(): boolean {
    const passwordsMatch = password === passwordConfirmation;
    setPasswordsMatch(passwordsMatch);
    return passwordsMatch;
  }

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Account
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              onChange={handleEmailChange}
              error={validSignup}
            />
            <TextField
              inputProps={{ 'aria-label': 'password' }}
              data-testid="password-input"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handlePasswordChange}
              onBlur={validatePasswords}
              error={!passwordsMatch}
            />
            <TextField
              inputProps={{ 'aria-label': 'Confirm Password' }}
              margin="normal"
              required
              fullWidth
              name="password-confirmation"
              label="Confirm Password"
              type="password"
              id="password-confirmation"
              onChange={handlePasswordConfirmationChange}
              onBlur={validatePasswords}
              error={!passwordsMatch}
            />
            {!passwordsMatch && (
              <Typography variant="body1" sx={{ color: 'red' }}>
                Passwords do not match!
              </Typography>
            )}
            {validSignup && (
              <Typography variant="body1" sx={{ color: 'red' }}>
                Email already taken, please use a different email!
              </Typography>
            )}
            <Button
              id="sign-up-button"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                !email || !password || !passwordConfirmation || !passwordsMatch
              }
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
