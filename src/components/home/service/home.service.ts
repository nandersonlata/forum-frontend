import { getAccessToken } from '../../auth/util';
import axios from 'axios';
import { GetPostsResponse } from '../types';

export async function createPost(
  message: string,
  authorId: number,
): Promise<GetPostsResponse> {
  const token = getAccessToken();
  const response = await axios.post(
    'http://localhost:3001/posts',
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
  const response = await axios.get('http://localhost:3001/posts', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
