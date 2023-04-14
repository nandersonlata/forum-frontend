import axios from 'axios';
import Home from './Home';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import * as authUtil from '../auth/util/auth.util';

jest.mock('axios');

describe('Home', () => {
  beforeEach(() => {
    jest.spyOn(authUtil, 'getCurrentUserId').mockReturnValue(2);
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
  });

  it('should display posts returned from the api', async () => {
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
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getAllByText('Edit', { exact: false }).length).toBe(1);
    });
  });

  it('should only display the delete button on posts which the current user posted', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getAllByText('Delete', { exact: false }).length).toBe(1);
    });
  });
});
