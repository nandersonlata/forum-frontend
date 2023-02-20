import { render, screen } from '@testing-library/react';
import React from 'react';
import SignIn from './Signin';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('Signin component', () => {
  it('should not allow a signin click if email and password are not provided', () => {
    render(
      <MemoryRouter initialEntries={['/signin']}>
        <SignIn />
      </MemoryRouter>,
    );
    const signInButton = screen.getByText('Sign In');
    expect(signInButton).toBeDisabled();
  });

  it('should allow a signin click if email and password are provided', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/signin']}>
        <SignIn />
      </MemoryRouter>,
    );

    const emailInput = screen.getByLabelText('Email Address', { exact: false });
    await user.type(emailInput, 'test@email.com');

    const passwordInput = screen.getByLabelText('Password', { exact: false });
    await user.type(passwordInput, 'testPassword');

    const signInButton = screen.getByText('Sign In');
    expect(signInButton).toBeEnabled();
  });
});
