import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import CreatePost from './CreatePost';

jest.mock('axios');

describe('Create Post', () => {
  it('should not allow a submission if no message has been given', async () => {
    render(
      <MemoryRouter>
        <CreatePost posts={[]} setPosts={() => {}} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/^Create Post$/)).toBeDisabled();
  });

  it('should allow a submission if a message has been given', async () => {
    render(
      <MemoryRouter>
        <CreatePost posts={[]} setPosts={() => {}} />
      </MemoryRouter>,
    );

    const user = userEvent.setup();

    const postMessageInput = screen.getByLabelText('Message', { exact: false });
    await user.type(postMessageInput, 'hello world');

    expect(screen.getByText(/^Create Post$/)).toBeEnabled();
  });

  it('should show an error message if response from server is a rejection', async () => {
    // @ts-ignore
    axios.post.mockRejectedValue('bad request');

    render(
      <MemoryRouter>
        <CreatePost posts={[]} setPosts={() => {}} />
      </MemoryRouter>,
    );

    const user = userEvent.setup();

    const postMessageInput = screen.getByLabelText('Message', { exact: false });
    await user.type(postMessageInput, 'hello world');

    const createPostButton = screen.getByText(/^Create Post$/);
    await user.click(createPostButton);

    expect(
      screen.getByText(/^An error occurred. Please try again later!$/),
    ).toBeInTheDocument();
  });
});
