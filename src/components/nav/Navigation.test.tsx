import Navigation from './Navigation';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

describe('Navigation', () => {
  it('should not display ProfileIcon if user is already on profile', () => {
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/profile',
      },
      writable: true,
    });

    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>,
    );

    expect(screen.queryByTestId('Person2Icon')).not.toBeInTheDocument();
  });

  it('should display ProfileIcon if user is not on profile', () => {
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/home',
      },
    });

    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>,
    );

    expect(screen.queryByTestId('Person2Icon')).toBeInTheDocument();
  });
});
