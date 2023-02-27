import { Box, createTheme, ThemeProvider } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import Navigation from '../nav/Navigation';
import CreatePost from './CreatePost';
import { PostDisplay } from './types';
import { getPosts } from './service';

const theme = createTheme();

export default function Home() {
  const [posts, setPosts] = useState<PostDisplay[]>([]);

  useEffect(() => {
    getPosts().then((data) => {
      setPosts(data);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <Box
          sx={{
            marginTop: 2,
          }}
        >
          <Navigation />
          <Box>
            <CreatePost posts={posts} setPosts={setPosts} />
          </Box>
          {posts.map((post) => (
            <p>{post.message}</p>
          ))}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
