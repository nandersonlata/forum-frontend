import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { PostDisplay, UpdatePostRequestBody } from '../types';
import { updatePost } from '../service';
import { defaultPostToUpdate } from '../Home';

type UpdatePostProps = {
  postToUpdate: PostDisplay & { originalMessage: string };
  setPostToUpdate: React.Dispatch<
    React.SetStateAction<PostDisplay & { originalMessage: string }>
  >;
};

export function UpdatePost(props: UpdatePostProps) {
  const { postToUpdate, setPostToUpdate } = props;
  const [newMessage, setNewMessage] = useState<string>('');
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  async function handleUpdatePost(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const updatePostRequestBody: UpdatePostRequestBody = {
      userId: postToUpdate.authorId,
      createdAt: postToUpdate.createdAt,
      newMessage,
    };
    try {
      await updatePost(updatePostRequestBody);
      postToUpdate.editing = false;
      postToUpdate.message = newMessage;
      setPostToUpdate(defaultPostToUpdate);
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
        {postToUpdate.author.displayName}
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
        defaultValue={postToUpdate.message}
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
        disabled={
          newMessage.length === 0 || newMessage === postToUpdate.originalMessage
        }
      >
        Update Post
      </Button>
    </Box>
  );
}
