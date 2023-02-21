import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import DeactivateAccount from './DeactivateAccount';
import userEvent from '@testing-library/user-event';

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
});
