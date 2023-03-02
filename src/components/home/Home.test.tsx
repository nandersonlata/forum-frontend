import axios from 'axios';
import Home from './Home';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';

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
});
