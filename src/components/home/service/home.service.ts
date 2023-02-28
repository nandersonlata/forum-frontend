import { getAccessToken } from '../../auth/util';
import axios from 'axios';
import { GetPostsResponse, PostDisplay } from '../types';

export async function createPost(message: string) {
  const token = getAccessToken();
  return await axios.post(
    'http://localhost:3001/posts',
    { message },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

export async function getPosts(): Promise<PostDisplay[]> {
  const token = getAccessToken();
  const response = await axios.get('http://localhost:3001/posts', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.map((post: GetPostsResponse) => {
    return { message: post.message, createdAt: post.createdAt };
  });
}
