import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../nav/Navigation';
import { getCurrentUser } from './service';
import { GetUserResponse } from './types';
import { useMemo, useState } from 'react';
import { ProfileSettings } from './settings/ProfileSettings';
import { PostDisplay } from '../home/types';
import { DisplayPost } from '../home/post/DisplayPost';
import { getUserPosts } from '../home/service';

export default function Profile() {
  const theme = createTheme();
  const [loggedInUser, setLoggedInUser] = useState<GetUserResponse>({
    id: 0,
    displayName: '',
  });
  const [userPosts, setUserPosts] = useState<PostDisplay[]>([]);

  const url = useLocation();
  const userProfileDisplayName = url.pathname.split('/')[2];

  useMemo(() => {
    getCurrentUser().then((user) => {
      setLoggedInUser(user);
    });
    getUserPosts(userProfileDisplayName).then((posts) => {
      setUserPosts(posts);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" sx={{ marginTop: 2 }}>
        <CssBaseline />
        <Navigation />
        <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          {loggedInUser.displayName.length > 0 &&
            userProfileDisplayName === loggedInUser.displayName && (
              <ProfileSettings />
            )}
          <Box sx={{ flexDirection: 'column', width: '25%' }}>
            {userPosts.map((post, index) => (
              <Box
                sx={{
                  borderRadius: '1px',
                  borderColor: 'gray',
                  borderStyle: 'solid',
                  justifyContent: 'space-between',
                  padding: '1%',
                  my: 1,
                }}
                key={index}
              >
                <DisplayPost post={post} />
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
