import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import DeactivateAccount from './DeactivateAccount';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

// interface AxiosMock extends AxiosStatic {
//   mockResolvedValue: Function;
//   mockRejectedValue: Function;
// }
//
// jest.mock('axios');
// const axiosMock = axios as AxiosMock;

jest.mock('axios');

describe('Deactivate Account', () => {
  it('should not allow a submission unless email and password have been provided', async () => {
    render(
      <MemoryRouter>
        <DeactivateAccount />
      </MemoryRouter>,
    );

    const deactivateButton = screen.getByText(/^Deactivate$/);
    expect(deactivateButton).toBeDisabled();
  });

  it('should allow a submission once email and password have been provided', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <DeactivateAccount />
      </MemoryRouter>,
    );

    const emailInput = screen.getByLabelText('Email Address', { exact: false });
    await user.type(emailInput, 'test@email.com');

    const passwordInput = screen.getByLabelText('Password', { exact: false });
    await user.type(passwordInput, 'testPassword');

    const deactivateButton = screen.getByText(/^Deactivate$/);
    expect(deactivateButton).toBeEnabled();
  });

  it('should show an error message if response from server is not 200', async () => {
    // @ts-ignore
    axios.patch.mockRejectedValue({ status: 403 });

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <DeactivateAccount />
      </MemoryRouter>,
    );

    const emailInput = screen.getByLabelText('Email Address', { exact: false });
    await user.type(emailInput, 'test@email.com');

    const passwordInput = screen.getByLabelText('Password', { exact: false });
    await user.type(passwordInput, 'testPassword');

    const deactivateButton = screen.getByText(/^Deactivate$/);
    await user.click(deactivateButton);

    const errorText = screen.getByText(
      /^An error occurred. Please try again later.$/,
    );
    expect(errorText).toBeInTheDocument();
  });

  it('should show message on how to reactivate an account', async () => {
    render(
      <MemoryRouter>
        <DeactivateAccount />
      </MemoryRouter>,
    );
    expect(
      screen.getByText(
        /^Logging in will automatically reactivate your account$/,
      ),
    ).toBeInTheDocument();
  });
});
