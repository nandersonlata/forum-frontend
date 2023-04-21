import { PostDisplay } from '../types';
import React from 'react';
import { DisplayPost } from './DisplayPost';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Display Post', () => {
  const post: PostDisplay = {
    id: 5,
    message: 'test message',
    createdAt: 'someTime',
    authorId: 1,
    author: {
      displayName: 'fakename',
    },
  };

  it('should display the display name and message of the post', () => {
    render(
      <MemoryRouter>
        <DisplayPost post={post} />
      </MemoryRouter>,
    );

    expect(screen.getByText(post.message)).toBeInTheDocument();
    expect(screen.getByText(post.author.displayName)).toBeInTheDocument();
  });
});
