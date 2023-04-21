import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import Profile from './Profile';
import * as profileService from './service/profile.service';
import * as postService from '../home/service/post.service';
import { createFakePost } from '../../util/test/test.util';
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/users/theUser',
  }),
}));

describe('Profile', () => {
  it('should not display profile settings if the current user is not the owner of the profile', async () => {
    jest
      .spyOn(profileService, 'getCurrentUser')
      .mockResolvedValue({ id: 1, displayName: 'testName' });
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
    );

    expect(screen.queryByLabelText('profile-settings')).toBeNull();
  });

  it('should display profile settings if the current user is the owner of the profile', async () => {
    jest
      .spyOn(profileService, 'getCurrentUser')
      .mockResolvedValue({ id: 1, displayName: 'theUser' });
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.queryByLabelText('profile-settings')).not.toBeNull();
    });
  });

  it('should display all the posts the user has made', async () => {
    jest
      .spyOn(profileService, 'getCurrentUser')
      .mockResolvedValue({ id: 1, displayName: 'testName' });

    jest.spyOn(postService, 'getUserPosts').mockResolvedValue([
      createFakePost({
        authorId: 1,
        message: 'hello world',
        author: { displayName: 'fakename' },
      }),
    ]);
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('hello world')).toBeInTheDocument();
    });
  });
});
