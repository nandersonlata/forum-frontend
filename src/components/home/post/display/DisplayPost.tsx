import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../types';

type DisplayPostProps = {
  post: Post;
};

export function DisplayPost(props: DisplayPostProps) {
  const { post } = props;
  return (
    <Box>
      <Link
        to={`/users/${post.author.displayName}`}
        style={{ textDecoration: 'none' }}
      >
        <Typography variant="h6" sx={{ mx: '1%' }}>
          {post.author.displayName}
        </Typography>
      </Link>
      <Typography variant="body1" sx={{ margin: '2%' }}>
        {post.message}
      </Typography>
    </Box>
  );
}
