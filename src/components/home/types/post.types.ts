export type PostDisplay = {
  id: number;
  message: string;

  authorId: number;

  createdAt: string;

  author: {
    displayName: string;
  };

  editing?: boolean;
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

export type CreatePostData = {
  message: string;
  authorId: number;
};

export type UpdatePostRequestBody = {
  authorId: number;
  newMessage: string;
  createdAt: string;
};

export type DeletePostRequestBody = {
  postId: number;
};
