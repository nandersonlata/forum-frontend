import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import SignUp from './Signup';
import userEvent from '@testing-library/user-event';

describe('Signup', () => {
  it('should not allow a sign up click if inputs have not been provided', () => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
        <SignUp />
      </MemoryRouter>,
    );
    const signUpButton = screen.getByText('Sign Up');
    expect(signUpButton).toBeDisabled();
  });

  it('should allow a sign up click if inputs have been provided', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/signin']}>
        <SignUp />
      </MemoryRouter>,
    );

    const emailInput = screen.getByLabelText('Email', { exact: false });
    await user.type(emailInput, 'test@email.com');

    const passwordInput = screen.getByLabelText(/^password/i);
    await user.type(passwordInput, 'testPassword');

    const passwordConfirmationInput =
      screen.getByLabelText(/^confirm password$/i);
    await user.type(passwordConfirmationInput, 'testPassword');

    const signUpButton = screen.getByText('Sign Up');
    expect(signUpButton).toBeEnabled();
  });
});
