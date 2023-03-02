export type PostDisplay = {
  message: string;

  createdAt: string;
};

export type GetPostsResponse = {
  id: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  message: string;
  author: {
    displayName: string;
  };
};
