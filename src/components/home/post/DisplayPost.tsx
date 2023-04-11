import { Box, Typography } from '@mui/material';
import React from 'react';
import { PostDisplay } from '../types';

type DisplayPostProps = {
  post: PostDisplay;
};

export function DisplayPost(props: DisplayPostProps) {
  const { post } = props;
  return (
    <Box>
      <Typography variant="h6" sx={{ mx: '1%' }}>
        {post.author.displayName}
      </Typography>
      <Typography variant="body1" sx={{ margin: '2%' }}>
        {post.message}
      </Typography>
    </Box>
  );
}
