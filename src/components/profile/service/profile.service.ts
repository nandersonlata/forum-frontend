import { getAccessToken } from '../../auth/util';
import axios from 'axios';
import { getConfigProperty } from '../../../util/config';

export async function deactivateAccount(email: string, password: string) {
  const token = getAccessToken();
  const apiUrl = getConfigProperty('REACT_APP_API_URL');
  await axios.patch(
    `${apiUrl}/auth/deactivate`,
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
