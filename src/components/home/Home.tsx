import { Box, createTheme, ThemeProvider } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useMemo, useState } from 'react';
import Navigation from '../nav/Navigation';
import CreatePost from './post/CreatePost';
import { PostDisplay } from './types';
import { getPosts } from './service';
import { Link } from 'react-router-dom';
import { getCurrentUserId } from '../auth/util';
import { UpdatePost } from './post/UpdatePost';
import { DisplayPost } from './post/DisplayPost';
import { DeletePostModal } from './post/DeletePostModal';

const theme = createTheme();
export const defaultPostToUpdate = {
  id: 0,
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
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const handleOpen = () => setDeleteModalOpen(true);

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

  function completeEdit(post: PostDisplay, newMessage: string) {
    post.editing = false;
    post.message = newMessage;
    setPostToUpdate(defaultPostToUpdate);
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
                    post={post}
                    originalMessage={post.message}
                    completeEdit={completeEdit}
                  />
                ) : (
                  <DisplayPost post={post} />
                )}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                  }}
                >
                  {currentUserId === post.authorId &&
                    !post.editing &&
                    !postToUpdate.editing && (
                      <Link to={'#'} onClick={() => startEditPost(post)}>
                        Edit
                      </Link>
                    )}
                  {currentUserId === post.authorId && post.editing && (
                    <Link
                      to={'#'}
                      onClick={() =>
                        completeEdit(post, postToUpdate.originalMessage)
                      }
                    >
                      Cancel
                    </Link>
                  )}
                  <Box>
                    {currentUserId === post.authorId && !post.editing && (
                      <Link to={'#'} onClick={handleOpen}>
                        Delete
                      </Link>
                    )}
                  </Box>
                </Box>
                {deleteModalOpen && (
                  <DeletePostModal
                    post={post}
                    open={deleteModalOpen}
                    setOpen={setDeleteModalOpen}
                  />
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
