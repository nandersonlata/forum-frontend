import { AxiosResponse } from 'axios';
import { DecodedToken, Tokens } from '../types';
import jwtDecode from 'jwt-decode';
import PasswordValidator from 'password-validator';
import * as EmailValidator from 'email-validator';

export function addTokensFromResponseToSessionStorage(
  response: AxiosResponse<any, any>,
): void {
  const responseTokens: Tokens = response.data;
  sessionStorage.setItem('access_token', responseTokens.access_token);
  sessionStorage.setItem('refresh_token', responseTokens.refresh_token);
}

export function isLoggedIn(): boolean {
  const at = getAccessToken();

  if (at == null) {
    return false;
  }

  const decodedToken: DecodedToken = jwtDecode(at);
  return isTokenExpired(decodedToken);
}

function getDecodedToken(): DecodedToken | null {
  const at = getAccessToken();

  if (at == null) {
    return null;
  }
  return jwtDecode(at);
}

export function getCurrentUserId(): number {
  const decodedToken = getDecodedToken();

  if (decodedToken == null) {
    return -1;
  }

  return decodedToken.sub;
}

function isTokenExpired(token: DecodedToken) {
  return Number(token.exp) >= Date.now() / 1000;
}

export function getAccessToken(): string | null {
  return sessionStorage.getItem('access_token');
}

const schema = new PasswordValidator();
schema
  .is()
  .min(5)
  .is()
  .max(25)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(1)
  .has()
  .not()
  .spaces();

export function isValidPassword(password: string): boolean {
  return schema.validate(password.trim()) as boolean;
}

export function isValidEmail(email: string): boolean {
  return EmailValidator.validate(email.trim());
}
