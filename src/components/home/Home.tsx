import { Box, createTheme, ThemeProvider, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import Navigation from '../nav/Navigation';
import CreatePost from './CreatePost';
import { GetPostsResponse, PostDisplay } from './types';
import { getPosts } from './service';

const theme = createTheme();

export default function Home() {
  const [posts, setPosts] = useState<PostDisplay[]>([]);

  useEffect(() => {
    getPosts().then((postsResponse) => {
      setPosts(
        postsResponse.sort(
          (post1, post2) =>
            new Date(post2.createdAt).getTime() -
            new Date(post1.createdAt).getTime(),
        ),
      );
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
          <Box>
            {posts.map((post) => (
              <Box
                sx={{
                  borderRadius: '1px',
                  borderColor: 'gray',
                  borderStyle: 'solid',
                  mx: '32%',
                }}
              >
                <Typography variant="h6" sx={{ mx: '1%' }}>
                  {post.author.displayName}
                </Typography>
                <Typography variant="body1" sx={{ margin: '2%' }}>
                  {post.message}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
