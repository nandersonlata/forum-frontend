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
import CreatePost from './post/CreatePost';
import { PostDisplay } from './types';
import { getPosts } from './service';
import { Link } from 'react-router-dom';
import { getCurrentUserId } from '../auth/util';
import { UpdatePost } from './post/UpdatePost';
import { DisplayPost } from './post/DisplayPost';

const theme = createTheme();

export default function Home() {
  const [posts, setPosts] = useState<PostDisplay[]>([]);
  const [editing, setEditing] = useState<boolean>(false);
  const [originalPostMessage, setOriginalPostMessage] = useState<string>('');
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
    setOriginalPostMessage(post.message);
  }

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
                  <UpdatePost post={post} setEditing={setEditing} />
                ) : (
                  <DisplayPost post={post} />
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
                        post.message = originalPostMessage;
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
