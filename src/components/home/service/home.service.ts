import { getAccessToken } from '../../auth/util';
import axios from 'axios';
import { GetPostsResponse } from '../types';
import { getConfigProperty } from '../../../util/config';

export async function createPost(
  message: string,
  authorId: number,
): Promise<GetPostsResponse> {
  const token = getAccessToken();
  const apiUrl = getConfigProperty('REACT_APP_API_URL');
  const response = await axios.post(
    `${apiUrl}/posts`,
    { message, authorId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export async function getPosts(): Promise<GetPostsResponse[]> {
  const token = getAccessToken();
  const apiUrl = getConfigProperty('REACT_APP_API_URL');
  const response = await axios.get(`${apiUrl}/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
