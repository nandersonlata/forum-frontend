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
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from './service';

const theme = createTheme();

export default function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [displayNameTaken, setDisplayNameTaken] = useState<boolean>(false);
  const [emailTaken, setEmailTaken] = useState<boolean>(false);
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

  function handleDisplayNameChange(
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    setDisplayName(event.target.value);
  }

  function handlePasswordConfirmationChange(
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    setPasswordConfirmation(event.target.value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const signUpDto = {
        email,
        password,
        displayName,
      };

      await signup(signUpDto);

      navigate('/');
    } catch (error) {
      // @ts-ignore
      const errorMessage = error.response.data.message;
      if (errorMessage === 'Email already taken') {
        setEmailTaken(true);
      }
      if (errorMessage === 'Display name already taken') {
        setDisplayNameTaken(true);
      }
    }
  }

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
              id="display-name"
              label="Display Name"
              name="display-name"
              autoFocus
              onChange={handleDisplayNameChange}
              error={displayNameTaken}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              onChange={handleEmailChange}
              error={emailTaken}
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
            {emailTaken && (
              <Typography variant="body1" sx={{ color: 'red' }}>
                Email already taken, please use a different email!
              </Typography>
            )}
            {displayNameTaken && (
              <Typography variant="body1" sx={{ color: 'red' }}>
                Display name already taken, please use a different display name!
              </Typography>
            )}
            <Button
              id="sign-up-button"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                !email ||
                !password ||
                !passwordConfirmation ||
                !passwordsMatch ||
                !displayName
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
