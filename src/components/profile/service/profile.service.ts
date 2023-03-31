import { getAccessToken } from '../../auth/util';
import axios from 'axios';
import { getConfigProperty } from '../../../util/config';
import { DeactivateAccountData } from '../types/profile.type';

export async function deactivateAccount(
  deactivateAccountData: DeactivateAccountData,
) {
  const token = getAccessToken();
  const apiUrl = getConfigProperty('REACT_APP_API_URL');
  await axios.patch(`${apiUrl}/auth/deactivate`, deactivateAccountData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
