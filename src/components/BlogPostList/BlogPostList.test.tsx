import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogPostList from './index';
import { Post } from "../../Types/types";

// Mock the InfiniteScroll and InlinePost components
jest.mock('react-infinite-scroll-component', () => ({ children, next }: any) => (
  <div data-testid="infinite-scroll" onScroll={next}>{children}</div>
));
jest.mock('../InlinePost', () => ({ onDelete, onEdit, post }: any) => (
  <div data-testid={`post-${post.id}`}>
    <button data-testid={`edit-${post.id}`} onClick={() => onEdit(post)}>Edit</button>
    <button data-testid={`delete-${post.id}`} onClick={() => onDelete(post)}>Delete</button>
  </div>
));

describe('BlogPostList', () => {
  const mockPosts: Post[] = [
    { id: '1', title: 'Test Title 1', body: 'Test Body 1' },
    { id: '2', title: 'Test Title 2', body: 'Test Body 2' }
  ];

  it('renders a list of posts', () => {
    render(
      <BlogPostList
        postList={mockPosts}
        fetchNextPage={() => { }}
        totalCount={5}
        onEdit={() => { }}
        onDelete={() => { }}
      />
    );
    expect(screen.getByTestId('post-1')).toBeInTheDocument();
    expect(screen.getByTestId('post-2')).toBeInTheDocument();
  });

  it('triggers fetchNextPage when scrolled', () => {
    const fetchNextPageMock = jest.fn();
    render(
      <BlogPostList
        postList={mockPosts}
        fetchNextPage={fetchNextPageMock}
        totalCount={5}
        onEdit={() => { }}
        onDelete={() => { }}
      />
    );
    fireEvent.scroll(screen.getByTestId('infinite-scroll'));
    expect(fetchNextPageMock).toHaveBeenCalled();
  });

  it('triggers onEdit when edit button is clicked', () => {
    const onEditMock = jest.fn();
    render(
      <BlogPostList
        postList={mockPosts}
        fetchNextPage={() => { }}
        totalCount={5}
        onEdit={onEditMock}
        onDelete={() => { }}
      />
    );
    fireEvent.click(screen.getByTestId('edit-1'));
    expect(onEditMock).toHaveBeenCalledWith(mockPosts[0]);
  });

  it('triggers onDelete when delete button is clicked', () => {
    const onDeleteMock = jest.fn();
    render(
      <BlogPostList
        postList={mockPosts}
        fetchNextPage={() => { }}
        totalCount={5}
        onEdit={() => { }}
        onDelete={onDeleteMock}
      />
    );
    fireEvent.click(screen.getByTestId('delete-1'));
    expect(onDeleteMock).toHaveBeenCalledWith(mockPosts[0]);
  });

});
