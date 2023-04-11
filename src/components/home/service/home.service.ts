import { getAccessToken } from '../../auth/util';
import axios from 'axios';
import {
  CreatePostData,
  GetPostsResponse,
  UpdatePostRequestBody,
} from '../types';
import { getConfigProperty } from '../../../util/config';

export async function createPost(
  createPostData: CreatePostData,
): Promise<GetPostsResponse> {
  const token = getAccessToken();
  const apiUrl = getConfigProperty('REACT_APP_API_URL');
  const response = await axios.post(`${apiUrl}/posts`, createPostData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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

export async function updatePost(body: UpdatePostRequestBody): Promise<number> {
  const token = getAccessToken();
  const apiUrl = getConfigProperty('REACT_APP_API_URL');
  const response = await axios.patch(`${apiUrl}/posts`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.status;
}
