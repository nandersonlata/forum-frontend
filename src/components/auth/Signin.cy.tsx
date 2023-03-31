import React from 'react';
import SignIn from './Signin';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/cypress/add-commands';

describe('<SignIn />', () => {
  it('should have a disabled sign in button if an email/password have not been provided', () => {
    cy.mount(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>,
    );
    cy.findByText('Sign In').should('have.attr', 'disabled');
  });

  it('should not have a disabled sign in button if an email/password have been provided', () => {
    cy.mount(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>,
    );

    cy.intercept('POST', '/auth/signin', { statusCode: 200 }).as('signIn');

    cy.findByText('Email Address').type('test@email.com');
    cy.findByTestId('password').type('testPassword');

    cy.findByText('Sign In').should('not.have.attr', 'disabled');
    cy.findByText('Sign In').click();
  });

  it('should have red borders around input if login attempt fails', () => {
    cy.mount(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>,
    );

    cy.intercept('POST', '/auth/signin', { statusCode: 403 }).as('signIn');

    const emailAddressInput = cy.findByText('Email Address');
    emailAddressInput.type('test@email.com');

    const passwordInput = cy.findByText('Password');
    cy.get('#password').click();
    passwordInput.type('testPassword');

    cy.findByText('Sign In').click();

    cy.wait('@signIn');

    emailAddressInput.should('have.class', 'Mui-error');
    passwordInput.should('have.class', 'Mui-error');
  });
});
