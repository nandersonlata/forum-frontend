import { addTokensFromResponseToSessionStorage, getAccessToken } from '../util';
import axios from 'axios';
import { SignUpDto } from '../types';
import { getConfigProperty } from '../../../util/config';

export async function logout() {
  try {
    const token = getAccessToken();
    const apiUrl = getConfigProperty('REACT_APP_API_URL');
    await axios.post(
      `${apiUrl}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    sessionStorage.clear();
  } catch (error) {
    console.log(error);
  }
}

export async function signin(email: string, password: string) {
  const apiUrl = getConfigProperty('REACT_APP_API_URL');
  const response = await axios.post(`${apiUrl}/auth/signin`, {
    email,
    password,
  });

  addTokensFromResponseToSessionStorage(response);
}

export async function signup(dto: SignUpDto) {
  const apiUrl = getConfigProperty('REACT_APP_API_URL');
  console.log(apiUrl);
  const response = await axios.post(`${apiUrl}/auth/signup`, {
    ...dto,
  });

  addTokensFromResponseToSessionStorage(response);
}
