import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { PostDisplay, UpdatePostRequestBody } from '../types';
import { updatePost } from '../service';

type UpdatePostProps = {
  post: PostDisplay;
  originalMessage: string;
  completeEdit: (post: PostDisplay, newMessage: string) => void;
};

export function UpdatePost(props: UpdatePostProps) {
  const { post, originalMessage, completeEdit } = props;
  const [newMessage, setNewMessage] = useState<string>('');
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  async function handleUpdatePost(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const updatePostRequestBody: UpdatePostRequestBody = {
      userId: post.authorId,
      createdAt: post.createdAt,
      newMessage,
    };
    try {
      await updatePost(updatePostRequestBody);
      completeEdit(post, newMessage);
    } catch (error) {
      // log error
      setShowErrorMessage(true);
    }
  }

  return (
    <Box
      component="form"
      onSubmit={(event) => handleUpdatePost(event)}
      noValidate
      sx={{ mt: 1 }}
    >
      <Typography variant="h6" sx={{ mx: '1%' }}>
        {post.author.displayName}
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="update-post-message"
        label="Update Post Message"
        name="update-post-message-input"
        autoComplete="update-post-message-input"
        autoFocus
        multiline
        minRows={3}
        defaultValue={post.message}
        onChange={(event) => setNewMessage(event.target.value)}
      />
      {showErrorMessage && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            my: 1,
          }}
        >
          <Typography sx={{ color: 'red' }}>
            Unable to update Post. Please try again later.
          </Typography>
        </Box>
      )}
      <Button
        id="update-post-button"
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 1, mb: 2 }}
        disabled={newMessage.length === 0 || newMessage === originalMessage}
      >
        Update Post
      </Button>
    </Box>
  );
}
