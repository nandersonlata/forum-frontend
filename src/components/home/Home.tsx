import {
  Box,
  Button,
  createTheme,
  ThemeProvider,
  Typography,
} from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import Navigation from '../nav/Navigation';
import CreatePost from './CreatePost';
import { PostDisplay } from './types';
import { getPosts } from './service';
import { Link } from 'react-router-dom';
import { getCurrentUserId } from '../auth/util';
import TextField from '@mui/material/TextField';

const theme = createTheme();

export default function Home() {
  const [posts, setPosts] = useState<PostDisplay[]>([]);
  const [editing, setEditing] = useState<boolean>(false);
  const currentUserId = getCurrentUserId();

  useEffect(() => {
    getPosts().then((postsResponse) => {
      postsResponse.sort(
        (post1, post2) =>
          new Date(post2.createdAt).getTime() -
          new Date(post1.createdAt).getTime(),
      );
      setPosts(
        posts.length === 0
          ? postsResponse.map((post) => {
              return {
                ...post,
              };
            })
          : posts,
      );
    });
  }, []);

  function startEditPost(post: PostDisplay) {
    post.editing = true;
    setEditing(true);
  }

  function handleUpdatePost(post: PostDisplay) {}
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
            {posts.map((post, index) => (
              <Box
                sx={{
                  borderRadius: '1px',
                  borderColor: 'gray',
                  borderStyle: 'solid',
                  mx: '32%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '1%',
                }}
                key={index}
              >
                {post.editing ? (
                  <Box
                    component="form"
                    onSubmit={() => handleUpdatePost(post)}
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
                      name="update-post-message-input"
                      autoComplete="update-post-message-input"
                      autoFocus
                      multiline
                      minRows={3}
                      value={post.message}
                    />
                    <Button
                      id="update-post-button"
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 1, mb: 2 }}
                    >
                      Update Post
                    </Button>
                  </Box>
                ) : (
                  <Box>
                    <Typography variant="h6" sx={{ mx: '1%' }}>
                      {post.author.displayName}
                    </Typography>
                    <Typography variant="body1" sx={{ margin: '2%' }}>
                      {post.message}
                    </Typography>
                  </Box>
                )}
                <Box>
                  {currentUserId === post.authorId && !post.editing && (
                    <Link to={'#'} onClick={() => startEditPost(post)}>
                      Edit
                    </Link>
                  )}
                  {currentUserId === post.authorId && post.editing && (
                    <Link
                      to={'#'}
                      onClick={() => {
                        setEditing(false);
                        post.editing = false;
                      }}
                    >
                      Cancel
                    </Link>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
