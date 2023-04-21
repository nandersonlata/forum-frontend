import { PostDisplay } from '../../types';
import React from 'react';
import { DisplayPost } from './DisplayPost';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createFakePostDisplay } from '../../../../util/test/test.util';

describe('Display Post', () => {
  const post: PostDisplay = createFakePostDisplay();

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
