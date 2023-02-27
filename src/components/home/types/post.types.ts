export type PostDisplay = {
  message: string;
};

export type GetPostsResponse = {
  id: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  message: string;
};