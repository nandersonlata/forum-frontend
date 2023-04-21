import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../Home';
import * as homeService from '../../service/post.service';
import React from 'react';
import * as authUtil from '../../../auth/util/auth.util';
import axios from 'axios';
import { createFakePost } from '../../../../util/test/test.util';

jest.mock('axios');

describe('delete post modal', () => {
  beforeEach(() => {
    jest.spyOn(authUtil, 'getCurrentUserId').mockReturnValue(2);
    // @ts-ignore
    axios.get.mockResolvedValue({
      data: [
        createFakePost({
          authorId: 2,
          message: 'Hello World',
          author: { displayName: 'fakename' },
        }),
      ],
    });
  });
  it('should open modal for deleting the post if the delete link is clicked', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const deleteLink = await screen.findByLabelText('delete-icon');
    await user.click(deleteLink);

    const deleteModal = await screen.findByTestId('delete-modal');
    expect(deleteModal).toBeInTheDocument();
  });

  it('should contain a confirmation message in the delete modal', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const deleteLink = await screen.findByLabelText('delete-icon');
    await user.click(deleteLink);

    expect(
      await screen.findByText('Are you sure you want to delete this post?'),
    ).toBeInTheDocument();
  });

  it('should call deletePost and close the modal if the user clicks yes', async () => {
    const deletePostSpy = jest
      .spyOn(homeService, 'deletePost')
      .mockResolvedValue(200);
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const deleteLink = await screen.findByLabelText('delete-icon');
    await user.click(deleteLink);

    const yesButton = await screen.findByText('Yes');
    await user.click(yesButton);

    expect(deletePostSpy).toHaveBeenCalled();

    const deleteModal = screen.queryByTestId('delete-modal');
    expect(deleteModal).toBeNull();
  });

  it('should display an error if deleting a post returns a rejected promise', async () => {
    jest
      .spyOn(homeService, 'deletePost')
      .mockRejectedValue('something went wrong');

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const deleteLink = await screen.findByLabelText('delete-icon');
    await user.click(deleteLink);

    const yesButton = await screen.findByText('Yes');
    await user.click(yesButton);

    const errorMessageText = await screen.findByText(
      'Something went wrong. Please try again later.',
    );
    expect(errorMessageText).toBeInTheDocument();
  });

  it('should close the modal if the cancel button is pressed', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const deleteLink = await screen.findByLabelText('delete-icon');
    await user.click(deleteLink);

    const cancelButton = await screen.findByText('Cancel');
    await user.click(cancelButton);

    const deleteModal = screen.queryByTestId('delete-modal');
    expect(deleteModal).toBeNull();
  });

  it('should remove the deleted post from the list of displayed posts if deletion was successful', async () => {
    jest
      .spyOn(homeService, 'deletePost')
      .mockResolvedValue(Promise.resolve(200));
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const deleteLink = await screen.findByLabelText('delete-icon');
    await user.click(deleteLink);

    const yesButton = await screen.findByText('Yes');
    await user.click(yesButton);

    expect(screen.queryByText('Hello World')).toBeNull();
  });
});
