import { AxiosResponse } from 'axios';
import { DecodedToken, Tokens } from '../types';
import jwtDecode from 'jwt-decode';

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
  return !isTokenExpired(decodedToken);
}

function isTokenExpired(token: DecodedToken) {
  return Number(token.exp) >= Date.now() / 1000;
}

export function getAccessToken(): string | null {
  return sessionStorage.getItem('access_token');
}
