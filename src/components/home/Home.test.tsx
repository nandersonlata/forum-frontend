import axios from 'axios';
import Home from './Home';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import * as authUtil from '../auth/util/auth.util';

jest.mock('axios');

describe('Home', () => {
  it('should display posts returned from the api', async () => {
    // @ts-ignore
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          authorId: 2,
          createdAt: Date.now().toString(),
          updatedAt: Date.now().toString(),
          message: 'Hello World',
          author: {
            displayName: 'fakename',
          },
        },
      ],
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText(/^fakename$/)).toBeInTheDocument();
      expect(screen.getByText(/^Hello World$/)).toBeInTheDocument();
    });
  });

  it('should only display edit button on posts which the current user posted', async () => {
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

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getAllByText('Edit', { exact: false }).length).toBe(1);
    });
  });
});
