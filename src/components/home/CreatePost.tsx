import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';
import {
  Box,
  Button,
  Container,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';

const theme = createTheme();
export default function CreatePost() {
  const [message, setMessage] = useState<string | null>(null);
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);

  function handleMessageChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessage(event.target.value);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/posts',
        { message },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
          },
        },
      );
      console.log(response);
      setErrorOccurred(false);
    } catch (error) {
      setErrorOccurred(true);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box>
          {errorOccurred && (
            <Typography variant="body1" sx={{ color: 'red' }}>
              An error occurred. Please try again later!
            </Typography>
          )}
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="create-pos-input"
              label="Message"
              name="create-post-input"
              autoComplete="create-post-input"
              autoFocus
              multiline
              minRows={3}
              onChange={handleMessageChange}
              error={errorOccurred}
            />
            <Button
              id="create-post-button"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
              disabled={!message}
            >
              Create Post
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
