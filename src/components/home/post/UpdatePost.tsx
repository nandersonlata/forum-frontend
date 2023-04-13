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

  const canSubmitUpdate = !(
    newMessage.length === 0 || newMessage === originalMessage
  );

  function handleUpdatePost() {
    const updatePostRequestBody: UpdatePostRequestBody = {
      authorId: post.authorId,
      createdAt: post.createdAt,
      newMessage,
    };

    updatePost(updatePostRequestBody)
      .then(() => {
        completeEdit(post, newMessage);
      })
      .catch((error) => {
        // log error
        setShowErrorMessage(true);
      });
  }

  return (
    <Box
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        handleUpdatePost();
      }}
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
        disabled={!canSubmitUpdate}
      >
        Update Post
      </Button>
    </Box>
  );
}
