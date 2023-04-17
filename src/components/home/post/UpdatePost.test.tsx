import * as authUtil from '../../auth/util/auth.util';
import axios from 'axios';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../Home';
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

  it('should show original post text if cancel button is pressed', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const editButton = await screen.findByLabelText('edit-icon');
    await user.click(editButton);

    const originalPostMessage = 'Hello World 3';
    const editMessageTextField = screen.getByText(originalPostMessage);
    await user.type(editMessageTextField, 'Updated text');

    const cancelButton = screen.getByLabelText('cancel-icon');
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

    const editButton = await screen.findByLabelText('edit-icon');
    await user.click(editButton);

    const updatePostMessageBox = screen.getByText('Hello World 3');
    await user.click(updatePostMessageBox);
    await user.type(updatePostMessageBox, 'New message');

    const updatePostButton = screen.getByText('Update Post');
    await user.click(updatePostButton);

    await waitFor(() => {
      expect(
        screen.getByText('Unable to update Post. Please try again later.'),
      ).toBeInTheDocument();
    });
  });

  it('should update page to show updated post message when updating the post succeeds', async () => {
    // @ts-ignore
    axios.patch.mockResolvedValue({
      response: {
        status: 200,
      },
    });
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const editButton = await screen.findByLabelText('edit-icon');
    await user.click(editButton);

    const updatePostMessageBox = screen.getByText('Hello World 3');
    await user.click(updatePostMessageBox);
    await user.type(updatePostMessageBox, 'New message');

    const updatePostButton = screen.getByText('Update Post');
    await user.click(updatePostButton);

    const newMessageText = screen.getByText('Hello World 3New message');
    expect(newMessageText).toBeInTheDocument();
  });

  it('should not allow an edit to be submitted if the text area is empty', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const editButton = await screen.findByLabelText('edit-icon');
    await user.click(editButton);

    expect(screen.getByText('Update Post')).toBeDisabled();
  });

  it('should not allow an edit to be submitted if the text area contains the same text as the original message', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const editButton = await screen.findByLabelText('edit-icon');
    await user.click(editButton);

    const updatePostMessageBox = screen.getByText('Hello World 3');
    user.clear(updatePostMessageBox);
    await user.type(updatePostMessageBox, 'Hello World 3');

    expect(screen.getByText('Update Post')).toBeDisabled();
  });
});
