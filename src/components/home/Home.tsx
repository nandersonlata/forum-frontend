import { Box, createTheme, ThemeProvider } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useMemo, useState } from 'react';
import Navigation from '../nav/Navigation';
import CreatePost from './post/CreatePost';
import { PostDisplay } from './types';
import { getPosts } from './service';
import { Link } from 'react-router-dom';
import { getCurrentUserId } from '../auth/util';
import { UpdatePost } from './post/UpdatePost';
import { DisplayPost } from './post/DisplayPost';

const theme = createTheme();
export const defaultPostToUpdate = {
  message: '',
  authorId: 0,
  createdAt: '',
  author: {
    displayName: '',
  },
  originalMessage: '',
};

export default function Home() {
  const [posts, setPosts] = useState<PostDisplay[]>([]);
  const [postToUpdate, setPostToUpdate] = useState<
    PostDisplay & { originalMessage: string }
  >(defaultPostToUpdate);
  const currentUserId = getCurrentUserId();

  useMemo(() => {
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
  }, [posts]);

  function startEditPost(post: PostDisplay) {
    post.editing = true;
    setPostToUpdate({
      ...post,
      originalMessage: post.message,
    });
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
                  <UpdatePost
                    postToUpdate={postToUpdate}
                    setPostToUpdate={setPostToUpdate}
                  />
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
                        post.editing = false;
                        post.message = postToUpdate?.originalMessage as string;
                        setPostToUpdate(defaultPostToUpdate);
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
