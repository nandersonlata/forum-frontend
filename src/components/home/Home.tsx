import { Box, createTheme, ThemeProvider } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import Navigation from '../nav/Navigation';
import CreatePost from './CreatePost';
import axios from 'axios';
import { GetPostsResponse, PostDisplay } from './types';

const theme = createTheme();

export default function Home() {
  const [posts, setPosts] = useState<PostDisplay[]>([]);

  function getPosts() {
    return axios
      .get('http://localhost:3001/posts', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
        },
      })
      .then((posts) => {
        return posts.data.map((post: GetPostsResponse) => {
          return { message: post.message };
        });
      });
  }

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
