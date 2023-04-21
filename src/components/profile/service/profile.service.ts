import { getAccessToken, getCurrentUserId } from '../../auth/util';
import axios from 'axios';
import { getConfigProperty } from '../../../util/config';
import { DeactivateAccountData, GetUserResponse } from '../types';

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

export async function getUserById(id: number): Promise<GetUserResponse> {
  const token = getAccessToken();
  const apiUrl = getConfigProperty('REACT_APP_API_URL');
  const response = await axios.get(`${apiUrl}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export function getCurrentUser(): Promise<GetUserResponse> {
  const userId = getCurrentUserId();
  return getUserById(userId);
  // TODO: handle case where the user is not logged in
}
