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
import Typography from '@mui/material/Typography';
import { PostDisplay } from '../../types';
import { createPost } from '../../service';
import { getCurrentUserId } from '../../../auth/util';

type CreatePostProps = {
  posts: PostDisplay[];
  setPosts: React.Dispatch<React.SetStateAction<PostDisplay[]>>;
};

const theme = createTheme();
export default function CreatePost(props: CreatePostProps) {
  const [message, setMessage] = useState<string>('');
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);

  function handleMessageChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessage(event.target.value);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const authorId = getCurrentUserId();
      const createPostData = {
        message,
        authorId,
      };
      const post = await createPost(createPostData);
      props.setPosts([post, ...props.posts]);
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
              disabled={!message && message.trim().length === 0}
            >
              Create Post
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
