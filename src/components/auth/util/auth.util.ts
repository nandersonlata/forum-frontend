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
  const at = sessionStorage.getItem('access_token');

  if (at == null) {
    return false;
  }

  const decodedToken: DecodedToken = jwtDecode(at);
  if (Number(decodedToken.exp) < Date.now() / 1000) {
    return false;
  }

  return true;
}
