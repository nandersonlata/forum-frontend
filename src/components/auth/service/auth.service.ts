import { addTokensFromResponseToSessionStorage, getAccessToken } from '../util';
import axios from 'axios';

export async function logout() {
  try {
    const token = getAccessToken();
    await axios.post(
      'http://localhost:3001/auth/logout',
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
  const response = await axios.post('http://localhost:3001/auth/signin', {
    email,
    password,
  });

  addTokensFromResponseToSessionStorage(response);
}

export async function signup(email: string, password: string) {
  const response = await axios.post('http://localhost:3001/auth/signup', {
    email,
    password,
  });

  addTokensFromResponseToSessionStorage(response);
}
