import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import SignUp from './Signup';
import userEvent from '@testing-library/user-event';
import axios, { AxiosStatic } from 'axios/index';

interface AxiosMock extends AxiosStatic {
  mockResolvedValue: Function;
  mockRejectedValue: Function;
}

jest.mock('axios');
const axiosMock = axios as AxiosMock;

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

  it("should make borders of password inputs red when passwords don't match and not allow a signup click", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );

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

  it('should show error message if response is a 403', async () => {
    axiosMock.mockRejectedValue({
      status: 403,
    });
    const user = userEvent.setup();
    render(
      <MemoryRouter>
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
    await user.click(signUpButton);

    expect(emailInput.closest('div')).toHaveClass('Mui-error');
    expect(screen.getByText(/email already taken/i)).toBeInTheDocument();
  });

  /*
      This test does not contain any expects, because
   */
  it('should not throw any errors if response is 200 and tokens are in the response', async () => {
    axiosMock.mockResolvedValue({
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
