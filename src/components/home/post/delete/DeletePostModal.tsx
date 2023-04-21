import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import { PostDisplay } from '../../types';
import { deletePost } from '../../service';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type DeletePostProps = {
  post: PostDisplay;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  removePostFromPosts: (post: PostDisplay) => void;
};

export function DeletePostModal(props: DeletePostProps) {
  const { post, open, setOpen, removePostFromPosts } = props;
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const handleClose = () => setOpen(false);

  console.log(post);

  function handleDeletePost(post: PostDisplay) {
    deletePost({ postId: post.id })
      .then(() => {
        removePostFromPosts(post);
        handleClose();
      })
      .catch((error) => {
        // log error
        setShowErrorMessage(true);
      });
  }

  return (
    <Modal open={open} data-testid={'delete-modal'}>
      <Box sx={style}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          {showErrorMessage && (
            <Typography sx={{ color: 'red', mb: 1 }}>
              Something went wrong. Please try again later.
            </Typography>
          )}
          <Typography>Are you sure you want to delete this post?</Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              mt: 2,
              width: '100%',
            }}
          >
            <Button variant="outlined" onClick={() => handleDeletePost(post)}>
              Yes
            </Button>
            <Button variant="outlined" onClick={() => handleClose()}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
