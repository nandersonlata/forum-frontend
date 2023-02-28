import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import SignUp from './Signup';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

jest.mock('axios');

describe('Signup', () => {
  it('should not allow a sign up click if inputs have not been provided', () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );
    const signUpButton = screen.getByText('Sign Up');
    expect(signUpButton).toBeDisabled();
  });

  it('should allow a sign up click if inputs have been provided', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );

    const displayNameInput = screen.getByLabelText('Display Name', {
      exact: false,
    });
    await user.type(displayNameInput, 'fakedisplayname');

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

  it("should make borders of password inputs red when passwords don't match and not allow a signup click", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );

    const displayNameInput = screen.getByLabelText('Display Name', {
      exact: false,
    });
    await user.type(displayNameInput, 'fakedisplayname');

    const emailInput = screen.getByLabelText('Email', { exact: false });
    await user.type(emailInput, 'test@email.com');

    const passwordInput = screen.getByLabelText(/^password/i);
    await user.type(passwordInput, 'testPassword');

    const passwordConfirmationInput =
      screen.getByLabelText(/^confirm password$/i);
    await user.type(passwordConfirmationInput, 'not matching password');

    const signUpButton = screen.getByText('Sign Up');
    expect(signUpButton).toBeDisabled();

    expect(passwordInput.closest('div')).toHaveClass('Mui-error');
    expect(passwordConfirmationInput.closest('div')).toHaveClass('Mui-error');
    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });

  it.each([['Email already taken'], ['Display name already taken']])(
    'should show error message if response message says email/displayName  already taken',
    async (message: string) => {
      // @ts-ignore
      axios.post.mockRejectedValue({
        response: {
          data: {
            status: 403,
            message,
          },
        },
      });

      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>,
      );

      const displayNameInput = screen.getByLabelText('Display Name', {
        exact: false,
      });
      await user.type(displayNameInput, 'fakedisplayname');

      const emailInput = screen.getByLabelText('Email', { exact: false });
      await user.type(emailInput, 'test@email.com');

      const passwordInput = screen.getByLabelText(/^password/i);
      await user.type(passwordInput, 'testPassword');

      const passwordConfirmationInput =
        screen.getByLabelText(/^confirm password$/i);
      await user.type(passwordConfirmationInput, 'testPassword');

      const signUpButton = screen.getByText('Sign Up');
      await user.click(signUpButton);

      expect(screen.getByText(message, { exact: false })).toBeInTheDocument();
    },
  );

  /*
      This test does not contain any expects, because it's just testing that the user is able to click the signIn button
      without any errors happening after
   */
  it('should not throw any errors if response is 200 and tokens are in the response', async () => {
    // @ts-ignore
    axios.post.mockResolvedValue({
      status: 200,
      data: {
        access_token: 'at',
        response_token: 'rt',
      },
    });

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );

    const displayNameInput = screen.getByLabelText('Display Name', {
      exact: false,
    });
    await user.type(displayNameInput, 'fakedisplayname');

    const emailInput = screen.getByLabelText('Email', { exact: false });
    await user.type(emailInput, 'test');

    const passwordInput = screen.getByLabelText(/^password/i);
    await user.type(passwordInput, 'testPassword');

    const passwordConfirmationInput =
      screen.getByLabelText(/^confirm password$/i);
    await user.type(passwordConfirmationInput, 'testPassword');

    const signUpButton = screen.getByText('Sign Up');
    await user.click(signUpButton);
  });
});
