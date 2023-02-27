import { getAccessToken } from '../../auth/util';
import axios from 'axios/index';

export async function deactivateAccount(email: string, password: string) {
  const token = getAccessToken();
  await axios.patch(
    'http://localhost:3001/auth/deactivate',
    {
      email,
      password,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}
