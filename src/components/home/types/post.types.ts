export type Post = {
  id: number;
  message: string;

  authorId: number;

  createdAt: string;
  updatedAt: string;

  author: {
    displayName: string;
  };

  editing?: boolean;
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
