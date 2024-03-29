import { Box, createTheme, ThemeProvider } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useMemo, useState } from 'react';
import Navigation from '../nav/Navigation';
import CreatePost from './post/create/CreatePost';
import { Post } from './types';
import { getPosts } from './service';
import { Link } from 'react-router-dom';
import { getCurrentUserId } from '../auth/util';
import { UpdatePost } from './post/update/UpdatePost';
import { DisplayPost } from './post/display/DisplayPost';
import { DeletePostModal } from './post/delete/DeletePostModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

const theme = createTheme();
export const defaultPost = {
  id: 0,
  message: '',
  authorId: 0,
  createdAt: '',
  updatedAt: '',
  author: {
    displayName: '',
  },
  originalMessage: '',
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postToUpdate, setPostToUpdate] = useState<
    Post & { originalMessage: string }
  >(defaultPost);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [postToDelete, setPostToDelete] = useState<Post>(defaultPost);
  const handleOpen = (post: Post) => {
    setDeleteModalOpen(true);
    setPostToDelete(post);
  };

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
  }, []);

  function startEditPost(post: Post) {
    post.editing = true;
    setPostToUpdate({
      ...post,
      originalMessage: post.message,
    });
  }

  function completeEdit(post: Post, newMessage: string) {
    post.editing = false;
    post.message = newMessage;
    setPostToUpdate(defaultPost);
  }
  function removePostFromPosts(postToRemove: Post) {
    setPosts(posts.filter((post) => post !== postToRemove));
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" sx={{ marginTop: 2 }}>
        <Navigation />
        <Box
          sx={{
            marginTop: 6,
          }}
        >
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
                      <Link
                        aria-label="edit-icon"
                        to={'#'}
                        onClick={() => startEditPost(post)}
                      >
                        <EditIcon
                          color="primary"
                          sx={{ '&:hover': { color: 'black' } }}
                        />
                      </Link>
                    )}
                  {currentUserId === post.authorId && post.editing && (
                    <Link
                      aria-label="cancel-icon"
                      to={'#'}
                      onClick={() =>
                        completeEdit(post, postToUpdate.originalMessage)
                      }
                    >
                      <CancelIcon
                        color="primary"
                        sx={{ '&:hover': { color: 'black' } }}
                      />
                    </Link>
                  )}
                  <Box>
                    {currentUserId === post.authorId && !post.editing && (
                      <Link
                        aria-label="delete-icon"
                        to={'#'}
                        onClick={() => handleOpen(post)}
                      >
                        <DeleteIcon
                          color="primary"
                          sx={{
                            '&:hover': { color: 'black' },
                          }}
                        />
                      </Link>
                    )}
                  </Box>
                </Box>
                {deleteModalOpen && postToDelete === post && (
                  <DeletePostModal
                    post={post}
                    open={deleteModalOpen}
                    setOpen={setDeleteModalOpen}
                    removePostFromPosts={removePostFromPosts}
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
