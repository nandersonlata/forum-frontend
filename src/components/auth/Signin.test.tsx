import { render, screen } from '@testing-library/react';
import React from 'react';
import SignIn from './Signin';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import axios, { AxiosStatic } from 'axios';

interface AxiosMock extends AxiosStatic {
  mockResolvedValue: Function;
  mockRejectedValue: Function;
}

jest.mock('axios');
const mockedAxios = axios as AxiosMock;

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

  it('inputs should have red borders when login fails', async () => {
    mockedAxios.mockRejectedValue({ status: 403 });
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
    await user.click(signInButton);

    expect(emailInput.closest('div')).toHaveClass('Mui-error');
    expect(passwordInput.closest('div')).toHaveClass('Mui-error');
  });
});
