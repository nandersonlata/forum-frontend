import * as authUtil from '../auth/util/auth.util';
import axios from 'axios';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';
import userEvent from '@testing-library/user-event';
import React from 'react';

jest.mock('axios');

describe('Update Post', () => {
  beforeEach(() => {
    jest.spyOn(authUtil, 'getCurrentUserId').mockReturnValue(3);
    // @ts-ignore
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          authorId: 2,
          createdAt: Date.now().toString(),
          updatedAt: Date.now().toString(),
          message: 'Hello World 2',
          author: {
            displayName: 'fakename2',
          },
        },
        {
          id: 2,
          authorId: 3,
          createdAt: Date.now().toString(),
          updatedAt: Date.now().toString(),
          message: 'Hello World 3',
          author: {
            displayName: 'fakename3',
          },
        },
      ],
    });
  });

  it('should only display edit button on posts which the current user posted', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getAllByText('Edit', { exact: false }).length).toBe(1);
    });
  });

  it('should show original post text if cancel button is pressed', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const editButton = await screen.findByText('Edit', { exact: false });
    await user.click(editButton);

    const originalPostMessage = 'Hello World 3';
    const editMessageTextField = screen.getByText(originalPostMessage);
    await user.type(editMessageTextField, 'Updated text');

    const cancelButton = screen.getByText('Cancel');
    await user.click(cancelButton);

    expect(screen.getByText(originalPostMessage)).toBeInTheDocument();
  });

  it('should show an error if updating the post failed', async () => {
    // @ts-ignore
    axios.patch.mockRejectedValue({
      response: {
        status: 400,
      },
    });
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const editButton = await screen.findByText('Edit', { exact: false });
    await user.click(editButton);

    const updatePostButton = screen.getByText('Update Post');
    await user.click(updatePostButton);

    await waitFor(() => {
      expect(
        screen.getByText('Unable to update Post. Please try again later.'),
      ).toBeInTheDocument();
    });
  });
});
