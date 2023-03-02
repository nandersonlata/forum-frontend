export type PostDisplay = {
  message: string;

  createdAt: string;

  author: {
    displayName: string;
  };
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
